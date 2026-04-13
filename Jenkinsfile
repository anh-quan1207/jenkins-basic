pipeline {
  agent any

  parameters {
    string(name: 'DEPLOY_HOST', defaultValue: 'APP_SERVER_IP', description: 'App server IP or hostname')
    string(name: 'DEPLOY_USER', defaultValue: 'ubuntu', description: 'SSH user on the app server')
    string(name: 'DEPLOY_DIR', defaultValue: '/opt/apps/jenkins-basic', description: 'Deploy directory on the app server')
  }

  environment {
    APP_NAME = "jenkins-basic"
    APP_PORT = "3000"
    HOST = "0.0.0.0"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy To App Server') {
      steps {
        sh '''
          rsync -avz --delete \
            --exclude ".git" \
            --exclude "node_modules" \
            --exclude ".next/cache" \
            ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_DIR}/

          ssh ${DEPLOY_USER}@${DEPLOY_HOST} '
            set -e
            cd '"${DEPLOY_DIR}"'
            npm install
            pm2 delete '"${APP_NAME}"' || true
            pm2 start npm --name '"${APP_NAME}"' -- start -- --hostname '"${HOST}"' --port '"${APP_PORT}"'
            pm2 save
          '
        '''
      }
    }

    stage('Smoke Check') {
      steps {
        sh '''
          sleep 5
          curl -I http://${DEPLOY_HOST}:${APP_PORT}
        '''
      }
    }
  }

  post {
    success {
      echo "Deployment complete. App should be available at http://${DEPLOY_HOST}:${APP_PORT}."
    }
    failure {
      echo 'Build or deploy failed. Check the Jenkins console log and remote pm2 logs.'
    }
  }
}
