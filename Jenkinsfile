pipeline {
    agent { dockerfile true }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
				stage('Build') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}