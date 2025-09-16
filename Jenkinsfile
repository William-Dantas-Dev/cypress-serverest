pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/William-Dantas-Dev/cypress-serverest.git'
                bat 'npm install'
            }
        }

        stage('Start Serverest') {
            steps {
                // inicia em background
                bat 'start "serverest" cmd /c "npx serverest"'
            }
        }

        stage('Test') {
            steps {
                bat '''set NO_COLOR=1
                       npm test'''
            }
        }
    }

    post {
        always {
            echo 'Killing Serverest...'
            bat 'taskkill /F /IM node.exe || exit 0'
        }
    }
}
