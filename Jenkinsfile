pipeline {
    agent any
    tools {
        nodejs 'Node 22'
    }
    options { ansiColor('xterm'); timestamps() }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Setup'){
            steps {
                git branch: 'main', url: 'https://github.com/William-Dantas-Dev/cypress-serverest.git'
                bat 'npm install'
            }
        }
        stage('Test'){
            steps {
                bat 'NO_COLOR=1 npm test'
            }
        }
    }
}