pipeline {
    agent { label 'slave' }

    environment {
        AWS_REGION = "us-west-1"
        ACCOUNT_ID = "782428715800"
    }

    stages {


        stage('Build Backend Image') {
            steps {
                sh 'docker build -t pink-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t pink-frontend ./frontend'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS \
                --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker tag pink-backend:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/pink-backend:latest
                docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/pink-backend:latest
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker tag pink-frontend:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/pink-frontend:latest
                docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/pink-frontend:latest
                '''
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh '''
                aws ecs update-service \
                --cluster app-ecs-cluster \
                --service ecs-service-2-BackendService-pOievtMqcgNl \
                --force-new-deployment

                aws ecs update-service \
                --cluster app-ecs-cluster \
                --service ecs-service-2-FrontendService-cVUnMHAog2s1 \
                --force-new-deployment
                '''
            }
        }
    }
}