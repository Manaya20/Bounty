provider "aws" {
  region = "us-east-1"
}

# VPC Configuration
resource "aws_vpc" "bounty_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "bounty-vpc"
  }
}

# Subnets
resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.bounty_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "bounty-public-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.bounty_vpc.id
  tags = {
    Name = "bounty-igw"
  }
}

# Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.bounty_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "bounty-public-rt"
  }
}

# Route Table Association
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# Security Group
resource "aws_security_group" "bounty_sg" {
  name        = "bounty-security-group"
  description = "Security group for Bounty application"
  vpc_id      = aws_vpc.bounty_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# S3 Bucket for Frontend
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "bounty-frontend-${var.environment}"
}

resource "aws_s3_bucket_ownership_controls" "frontend_bucket_ownership" {
  bucket = aws_s3_bucket.frontend_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend_bucket_public_access" {
  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "frontend_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.frontend_bucket_ownership,
    aws_s3_bucket_public_access_block.frontend_bucket_public_access,
  ]

  bucket = aws_s3_bucket.frontend_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend_bucket_website" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# S3 Bucket for Backend
resource "aws_s3_bucket" "backend_bucket" {
  bucket = "bounty-backend-${var.environment}"
}

resource "aws_s3_bucket_ownership_controls" "backend_bucket_ownership" {
  bucket = aws_s3_bucket.backend_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "backend_bucket_public_access" {
  bucket = aws_s3_bucket.backend_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_acl" "backend_bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.backend_bucket_ownership,
    aws_s3_bucket_public_access_block.backend_bucket_public_access,
  ]

  bucket = aws_s3_bucket.backend_bucket.id
  acl    = "private"
}

# CloudFront Distribution for Frontend
resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend_bucket.id}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend_bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
} 