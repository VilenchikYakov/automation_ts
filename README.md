# qa_automation_ts
New automation repository using typescrip
Installation instructions:
Use npm 10.13.0
1. Install nvm: Open terminal => curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
2. Type "nvm install 10.13.0"
3. Type: "nvm alias default 10.13.0"

Clone qa-automation repository to your machine:
1. Create folder => navigate to a new folder => run "git init"
2. Run "git clone git@github.com:localizedev/qa-automation_ts.git"
3. Navigate to qa-automation folder => run "npm i"

To run performance tests  locally type  "npm run test:perf"
To run performance tests in Docker :
1 Go to performance folder (cd src/integration/performance)
2 Make build (./build.sh)
3 Run tests for specific env (./run.sh ${searchPage paramater}) --params can be found in 
4 Run tests for all envs (./runAll.sh)

