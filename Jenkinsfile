// Jenkins runs directly on the same VPS this site is deployed to, so the
// whole pipeline stays local: build the image here, run it here — no
// registry, no SSH, no Jenkins credentials needed at all.
//
// The only requirement on this host: the user Jenkins runs as must be able
// to run `docker` / `docker compose` (e.g. be in the `docker` group).
//
// Also requires the "GitHub" plugin and a webhook on the repo pointing at
// http://<jenkins-host>/github-webhook/ so pushes trigger this pipeline.

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '15'))
    }

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME  = 'portfolio-v3'
        DEPLOY_PATH = '/home/ubuntu/portfolio' // where docker-compose.yml/.env live
        HOST_PORT   = '80'                     // port nginx is published on
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set build metadata') {
            steps {
                script {
                    env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
                }
            }
        }

        stage('Build image') {
            steps {
                sh 'docker build -t "$IMAGE_NAME:$IMAGE_TAG" -t "$IMAGE_NAME:latest" .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e
                    mkdir -p "$DEPLOY_PATH"
                    cp docker-compose.yml "$DEPLOY_PATH/docker-compose.yml"
                    printf 'IMAGE_TAG=%s\\nHOST_PORT=%s\\n' "$IMAGE_TAG" "$HOST_PORT" > "$DEPLOY_PATH/.env"

                    cd "$DEPLOY_PATH"
                    docker compose -p portfolio up -d
                    docker image prune -f
                '''
            }
        }

        stage('Smoke test') {
            steps {
                sh '''
                    sleep 5
                    curl -fsS "http://localhost:$HOST_PORT" > /dev/null
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed — see the failing stage log above.'
        }
    }
}
