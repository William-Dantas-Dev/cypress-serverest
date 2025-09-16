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

        stage('Test') {
            steps {
                bat 'set NO_COLOR=1'
                bat 'npm test'
            }
        }
    }
}
