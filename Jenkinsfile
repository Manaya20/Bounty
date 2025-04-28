pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'deploy-jenkinks', url: 'https://github.com/Manaya20/Bounty.git'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                sh '''
                cd frontend
                docker build -t $DOCKERHUB_CREDENTIALS_USR/bounty-frontend:latest .
                docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                docker push $DOCKERHUB_CREDENTIALS_USR/bounty-frontend:latest
                cd ../backend
                docker build -t $DOCKERHUB_CREDENTIALS_USR/bounty-backend:latest .
                docker push $DOCKERHUB_CREDENTIALS_USR/bounty-backend:latest
                '''
            }
        }

        stage('Terraform Deploy') {
            steps {
                dir('terraform') {
                    sh '''
                    terraform init
                    terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Deploy containers') {
            steps {
                sshagent (credentials: ['bounty-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@y51.20.131.66 << EOF
                      docker pull $DOCKERHUB_CREDENTIALS_USR/bounty-frontend:latest
                      docker pull $DOCKERHUB_CREDENTIALS_USR/bounty-backend:latest
                      cd /home/ubuntu
                      docker-compose up -d
                    EOF
                    '''
                }
            }
        }
    }
}
