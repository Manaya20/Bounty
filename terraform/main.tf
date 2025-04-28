provider "aws" {
  region = "eu-north-1"
}

resource "aws_instance" "bounty_server" {
  ami           = "ami-04542995864e26699"  # Ubuntu 22.04 LTS AMI
  instance_type = "t3.micro"
  key_name      = "bounty"

  user_data = <<-EOF
              #!/bin/bash
              apt update -y
              apt install docker.io -y
              apt install docker-compose -y
              systemctl start docker
              systemctl enable docker
          EOF

  tags = {
    Name = "BountyServer"
  }

  vpc_security_group_ids = ["${aws_security_group.bounty_sg.id}"]
}

resource "aws_security_group" "bounty_sg" {
  name        = "bounty_sg"
  description = "Allow frontend/backend traffic"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
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
