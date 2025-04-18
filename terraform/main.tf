provider "aws" {
  region = var.aws_region
}

# VPC Configuration
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "bounty-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
  
  tags = {
    Environment = "production"
    Project     = "Bounty"
  }
}

# Elastic Beanstalk Application
resource "aws_elastic_beanstalk_application" "bounty" {
  name        = "bounty-app"
  description = "Bounty Platform Application"
}

# Elastic Beanstalk Environment
resource "aws_elastic_beanstalk_environment" "bounty" {
  name                = "bounty-env"
  application         = aws_elastic_beanstalk_application.bounty.name
  solution_stack_name = "64bit Amazon Linux 2 v5.8.0 running Node.js 18"
  
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.micro"
  }
  
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }
  
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "4"
  }
}

# RDS Database
module "db" {
  source = "terraform-aws-modules/rds/aws"
  
  identifier = "bounty-db"
  
  engine            = "postgres"
  engine_version    = "13.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  
  db_name  = "bounty"
  username = "bounty_admin"
  port     = "5432"
  
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  
  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"
  
  tags = {
    Environment = "production"
    Project     = "Bounty"
  }
}

# S3 Bucket for Frontend
resource "aws_s3_bucket" "frontend" {
  bucket = "bounty-frontend-${var.environment}"
  
  tags = {
    Environment = var.environment
    Project     = "Bounty"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"
  }
  
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.id}"
    
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