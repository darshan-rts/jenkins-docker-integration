// Declarative Pipeline where we define the steps to be executed directly into the pipeline unlike Scripted where we for each stage
// we have groovy script running in background which can be more flexible and less tedious.
pipeline{

    agent any

    stages{

        stage('Build'){
            steps
            {
                
                sh '''
                echo $WORKSPACE;
                npm install;
                tar -cvf blog_app.tar.gz node_modules app.js package.json Procfile public views;                               
                '''
            }
        }

        stage('Test'){
            steps
            {
                echo 'Test the code'
            }
        }

        stage('Deploy'){
            steps
            {
                echo 'Deploy the code'
                sh '''
                scp blog_app.tar.gz jenkins@$DEFAULT_IP:/usrdata/apps/appserver/deployment;
                ssh jenkins@$DEFAULT_IP "
                tar -xvf /usrdata/apps/appserver/deployment/blog_app.tar.gz -C /usrdata/apps/appserver/node
                "                
                '''
            }
        }
    }
}