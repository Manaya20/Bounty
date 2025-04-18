# Bounty Project

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- AWS CLI configured with appropriate credentials
- Terraform (v1.0 or higher)
- Docker and Docker Compose
- GitHub account with repository access

### Infrastructure Setup

1. Initialize Terraform:
```bash
cd terraform
terraform init
```

2. Apply Terraform configuration:
```bash
terraform plan
terraform apply
```

### CI/CD Setup

1. Set up GitHub Secrets:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET_NAME
- SNYK_TOKEN

2. Push to main branch to trigger deployment

### Monitoring Setup

1. Start monitoring stack:
```bash
cd monitoring
docker-compose up -d
```

2. Access monitoring tools:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (admin/admin)
- Kibana: http://localhost:5601

### Security Scanning

1. Run SonarQube analysis:
```bash
sonar-scanner
```

2. Run OWASP ZAP scan:
```bash
zap-cli quick-scan --self-contained http://localhost:3000
```

3. Run Trivy container scan:
```bash
trivy image bounty-frontend:latest
```

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Testing

### Unit Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

### Integration Tests
```bash
# Frontend
cd frontend
npm run test:integration

# Backend
cd backend
npm run test:integration
```

## Deployment

The application is automatically deployed through GitHub Actions when changes are pushed to the main branch. The deployment process includes:

1. Building the application
2. Running tests
3. Security scanning
4. Infrastructure deployment
5. Application deployment to AWS

## Monitoring

The application is monitored using:
- Prometheus for metrics collection
- Grafana for visualization
- ELK stack for logging
- Node Exporter for system metrics

## Security

Security measures include:
- SonarQube for code quality analysis
- OWASP ZAP for security scanning
- Trivy for container scanning
- Automated security testing in CI/CD pipeline 