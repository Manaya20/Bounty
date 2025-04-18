#!/bin/bash

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI not found. Please install it first: https://cli.github.com/"
    exit 1
fi

# Check if user is logged in
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub first: gh auth login"
    exit 1
fi

# Set AWS credentials
read -p "Enter AWS Access Key ID: " AWS_ACCESS_KEY_ID
read -p "Enter AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
read -p "Enter AWS Region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

# Set Elastic Beanstalk configuration
read -p "Enter Elastic Beanstalk Application Name: " EB_APP_NAME
read -p "Enter Elastic Beanstalk Environment Name: " EB_ENV_NAME

# Set SonarQube configuration
read -p "Enter SonarQube Token: " SONAR_TOKEN
read -p "Enter SonarQube Host URL: " SONAR_HOST_URL

# Set database credentials
read -p "Enter Database Username: " DB_USERNAME
read -p "Enter Database Password: " DB_PASSWORD

# Set S3 bucket name
read -p "Enter S3 Bucket Name: " S3_BUCKET_NAME

# Set secrets in GitHub
gh secret set AWS_ACCESS_KEY_ID --body "$AWS_ACCESS_KEY_ID"
gh secret set AWS_SECRET_ACCESS_KEY --body "$AWS_SECRET_ACCESS_KEY"
gh secret set AWS_REGION --body "$AWS_REGION"
gh secret set EB_APP_NAME --body "$EB_APP_NAME"
gh secret set EB_ENV_NAME --body "$EB_ENV_NAME"
gh secret set SONAR_TOKEN --body "$SONAR_TOKEN"
gh secret set SONAR_HOST_URL --body "$SONAR_HOST_URL"
gh secret set DB_USERNAME --body "$DB_USERNAME"
gh secret set DB_PASSWORD --body "$DB_PASSWORD"
gh secret set S3_BUCKET_NAME --body "$S3_BUCKET_NAME"

echo "All secrets have been set successfully!" 