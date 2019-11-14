pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  parameters {
    string(name: 'BRANCH_NAME', defaultValue: 'master', description: '')
    string(name: 'IMAGE_NAME', defaultValue: 'user/ks-ui', description: 'dockerhub repository')
    string(name: 'TAG', defaultValue: 'latest', description: '')
    booleanParam(name: 'CODE_ANAlYSIS', defaultValue: false, description: 'is run code analysis?')
    string(name: 'PORJECT_KEY', defaultValue: 'ks', description: 'sonarqube project key')
    booleanParam(name: 'PUSH_IMAGE', defaultValue: false, description: 'is push image?')
  }
  stages {
    stage('get source') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/$BRANCH_NAME']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/kubesphere/kubesphere.github.io.git']]])
      }
    }
    stage('parallel task') {
      parallel {
        stage('get dependencies') {
          steps {
            container('nodejs') {
              sh 'yarn config set registry https://registry.npm.taobao.org'
              sh 'yarn'
            }
          }
        }
        stage('code analysis') {
          when {
            environment name: 'CODE_ANAlYSIS', value: 'true'
          }
          steps {
            container('nodejs') {
              withCredentials([string(credentialsId : 'SONAR_TOKEN' ,variable : 'SONAR_TOKEN' ,)]) {
                withSonarQubeEnv('sonar') {
                  sh 'sonar-scanner -Dsonar.branch=$BRANCH_NAME  -Dsonar.projectKey=$PORJECT_KEY -Dsonar.sources=. -Dsonar.login=$SONAR_TOKEN'
                }
                waitForQualityGate 'false'
              }
            }
          }
        }
      }
    }
    stage('build') {
      steps {
        container('nodejs') {
          sh 'yarn build'
          sh 'docker build -t ks-ui .'
        }
      }
    }
    stage('push image') {
      when {
        environment name: 'PUSH_IMAGE', value: 'true'
      }
      steps {
        container('nodejs') {
          withCredentials([usernamePassword(credentialsId : 'docker' ,passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker tag ks-ui $IMAGE_NAME:$TAG'
          }
        }
      }
    }
  }
}