// Requires on the Jenkins agent: docker CLI (with daemon access) and
// openssh-client. Requires these Jenkins credentials to exist:
//   - github-registry-token  (Username with password) — GitHub username +
//                              a PAT with write:packages scope, used to push
//   - vps-ssh-key            (SSH Username with private key) — deploy user
//                              + private key for the VPS
//   - vps-host               (Secret text) — VPS hostname or IP
//
// The repo (and the ghcr.io/<owner>/portfolio-v3 package) is public, so the
// VPS pulls the image anonymously — no registry login needed there. After
// the first push, open the package's GitHub Packages settings once and set
// its visibility to Public (it defaults to private even for public repos).
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
        REGISTRY    = 'ghcr.io'
        IMAGE_OWNER = 'wackfy4x' // lowercase GitHub username/org
        IMAGE_NAME  = 'portfolio-v3'
        IMAGE       = "${REGISTRY}/${IMAGE_OWNER}/${IMAGE_NAME}"
        DEPLOY_PATH = '/home/ubuntu/portfolio'         // absolute path on the VPS
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
                sh 'docker build -t "$IMAGE:$IMAGE_TAG" -t "$IMAGE:latest" .'
            }
        }

        stage('Push image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-registry-token',
                    usernameVariable: 'REG_USER',
                    passwordVariable: 'REG_TOKEN'
                )]) {
                    sh '''
                        set -e
                        echo "$REG_TOKEN" | docker login "$REGISTRY" -u "$REG_USER" --password-stdin
                        docker push "$IMAGE:$IMAGE_TAG"
                        docker push "$IMAGE:latest"
                        docker logout "$REGISTRY"
                    '''
                }
            }
        }

        stage('Deploy to VPS') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: '4d577965-4441-46c1-a2b2-f41c58bde8e9', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER'),
                    string(credentialsId: 'vps-host', variable: 'VPS_HOST')
                ]) {
                    sh '''
                        set -e
                        SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=no"

                        ssh $SSH_OPTS "$SSH_USER@$VPS_HOST" "mkdir -p $DEPLOY_PATH"
                        scp $SSH_OPTS docker-compose.yml "$SSH_USER@$VPS_HOST:$DEPLOY_PATH/docker-compose.yml"
                        printf 'IMAGE_TAG=%s\\nHOST_PORT=%s\\n' "$IMAGE_TAG" "$HOST_PORT" \
                            | ssh $SSH_OPTS "$SSH_USER@$VPS_HOST" "cat > $DEPLOY_PATH/.env"

                        # Public package — pulls anonymously, no registry login needed.
                        ssh $SSH_OPTS "$SSH_USER@$VPS_HOST" bash -s <<REMOTE
set -e
cd $DEPLOY_PATH
docker compose pull
docker compose up -d
docker image prune -f
REMOTE
                    '''
                }
            }
        }

        stage('Smoke test') {
            steps {
                withCredentials([string(credentialsId: 'vps-host', variable: 'VPS_HOST')]) {
                    sh '''
                        sleep 5
                        curl -fsS "http://$VPS_HOST:$HOST_PORT" > /dev/null
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed — see the failing stage log above.'
        }
    }
}
