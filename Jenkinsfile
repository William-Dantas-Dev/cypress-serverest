pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/William-Dantas-Dev/cypress-serverest.git'
            }
        }
        stage('Install Dependencies'){
            steps {
                bat 'npm install'
            }
        }

        stage('run Serverest'){
            steps {
                bat 'npm run test:e2e'
            }
        }

        stage('Test') {
            steps {
                bat 'set NO_COLOR=1'
                bat 'npm test'
            }
        }
    }
}
