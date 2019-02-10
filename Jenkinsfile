node("npm") {
    def scmVars
    stage ("Checkout"){
        scmVars = checkout scm
    }
    stage ("Install"){
        updateGitlabCommitStatus name: 'install', state: 'running'
        try {
            echo scmVars.GIT_COMMIT
            sh 'npm i'
        }catch(e) {
            updateGitlabCommitStatus name: 'install', state: 'failed'
            echo "not exist command"
            throw new hudson.AbortException('Installation Error')
        }
        updateGitlabCommitStatus name: 'install', state: 'success'
    }
    stage ("Build"){
        updateGitlabCommitStatus name: 'build', state: 'running'
        try {
            sh 'npm run build'
            echo env.BUILD_NUMBER
        }catch(e) {
            updateGitlabCommitStatus name: 'build', state: 'failed'
            echo "not exist command"
            throw new hudson.AbortException('Build Error')
        }
        updateGitlabCommitStatus name: 'build', state: 'success'
    }
    stage ("Tests"){
        updateGitlabCommitStatus name: 'test', state: 'running'
        // tests here
        updateGitlabCommitStatus name: 'test', state: 'success'
    }
     stage ("Docker Image"){
        updateGitlabCommitStatus name: 'docker-image', state: 'running'
         try {
            sh """
            docker build --rm -t aio-app:${env.BUILD_NUMBER} .
            docker tag aio-app:${env.BUILD_NUMBER} aio-app:latest
            """
        }catch(e) {
            updateGitlabCommitStatus name: 'install', state: 'failed'
            echo "not exist command"
            throw new hudson.AbortException('Installation Error')
        }
        updateGitlabCommitStatus name: 'docker-image', state: 'success'
    }
}