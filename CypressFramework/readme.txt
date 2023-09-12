Follow the below steps to clone the existing framework:
1. Clone the code from the github repo:
repo link -> 

2. Install VS Code and open the cloned folder

3. Install Node JS and set the environment variables path.

4. Install cucumber plugin:
npm install @badeball/cypress-cucumber-preprocessor

5. npx cypress open to view the cypress gui and run execution.


Follow the below steps to setup cypress automation framework environment from scratch.
1. Install VS Code:
Create and Open the project folder in VS Code -> /CypressFramework

2. Install Node JS:
Cypress is build on node.js, with node run time environment hence it comes with an npm module package.
https://nodejs.org/en/download 
Windows Installer (.msi) / macOS Installer (.pkg)

3. Set the node js path in your environment variables:
Node_Home | C:\Program Files\nodejs

4. Create Package.json which holds metadata and manages the project's dependencies:
Go to VS Code terminal and Enter npm -i init & provide package name, desc, version. keywords, authors etc

5. Install Cypress
npm install cypress --save-dev
Cypress will be installed(5 mins) and a entry will be made in package.json

6. To open/run cypress for first time (version 13)
node_modules/.bin/cypress open  or npx cypress open

7. Select E2E Testing option on Cypress GUI
Select the browser and Initialize the config. The browser will be installed and projected will be loaded.
cypress.config.js file will be created.

8. Install cucumber plugin:
npm install @badeball/cypress-cucumber-preprocessor and npm install @cypress/browserify-preprocessor
below plugin details should be added in package.json file  
	"@badeball/cypress-cucumber-preprocessor": "^18.0.5",
    "@cypress/browserify-preprocessor": "latest"
	
Load the plugin in cypress.config-setupNodeEvents and import preprocessor/browserify.
These info should be available in https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-cjs/cypress.config.js

Notes to consider:
1. Cypress suggests to write in mocha framework which inturn comes with cypress bundle. Chai is the assertion library we will be using to validate data in tests.

2. To run cypress in headless or headed mode
	npx cypress run --headless
	npx cypress run --browser firefox //to run headless in firefox/chrome/edge. default is electron
	npx cypress open // headed mode

3. Cypress Automation project folder structure:
I) fixture - All the test data's are present in the folder consider it a .json/.xls file
II) integration - All the test suite and test methods are present inside the integration folder
III) plugins - Used to handle the cypress listeners
IV) support - All reusable methods will be placed in the support folder
V) node_modules is the heart for the cypress project, it will be created when you npm install cypress.
VI) cypress.config.js is the configuration file for entire framework (All properties will be set)
ie. If default window size needs to be changed, then the prop value has to be updated in cypress.config.js and the same goes with screenshot/videos/downloads folder.

4. To handle iframes in cypress you need to install the plugins
npm install -D cypress-iframe

5. Cucumber reports
https://github.com/cucumber/json-formatter
