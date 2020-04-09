# E2E Test for Circle CI Implementation

End-to-end testing suite for Share911 service.  
Installing and writing Cypress tests with Cucumber Gherkin Syntax for a Meteor app

## To run this repository on CircleCI
- Clone the repository
- Delete the exisiting .git folder
- Push the entire repository except the .circleci folder to your own repo in Github
- Sign into Circle CI and follow the project with the repo
- When asked to input config.yml, copy and paste the contents of .circleCi/config.yml. Do NOT press start building.
- Delete the existing .circleCi folder in your local folder. Press start building on circle ci.
- You will have a pull request on your Github repository. Merge the .circleCi-project-setup branch.
- git pull the new .circleCi folder into your local repo.
- At this point, circleCI should be running the cypress tests on its app.

## Cypress Installation

### Git Clone the Repo 
git clone <address>
This already has cypress installed on it.   
If you are building cypress onto your project, simply call command: npm install cypress
### Install Dependencies
- npm install 

# Run Tests Through any of These Modes.

These modes are configurable in /e2e/cypress/config/

-npm run cypress:open:qa
-npm run cypress:open:prod  
-npm run cypress:open:dev  
-npm run test:prod  
-npm run test:local 

 Check package.json for more.  

# Writing Tests

The tests are written in Gherkin Syntax first   
We recommend writing concise statements that can be reused in other scenarios.  
The statements outta reflect specific action that will result in a specific state to ensure accurate testing.  
Gradually building a Gherkin collection of vocabulary and phrases that can be reused along with its javascript counter part  
will improve the time writing new tests. 

```ruby
# e2e/cypress/integration/test1/test1.feature
Feature: Testing DDPS Log In Feature
  @e2e-test
Scenario: 'email1@email1.com' logs in and logs out multiple times   
    
    Given I am at the website
    When 'email1@email1.com' logs in and logs out 3 times 
    Then alert message should pop up
```
The cypress javascript file for the gherkin file exist under the same named folder 

```javascript
// e2e/cypress/integration/test1/test1/test1.js
import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps'
import  generalFunctions ./../../pages/general.js

Given('I am at the website', () => {
  cy.viewport(1024, 768)
  const myConfig = Cypress.config()
  expect(myConfig).to.have.property('baseUrl')
  cy.visit(myConfig.baseUrl)
})

When('{string} logs in and out {number} times', (email, number) => {
  const userList = Cypress.env('users')
  const user = userList[email]
  const password = user['password']

 for( var i=0; i <number, i++){
  cy.get('#inputField').type(user)cy.get('#inputField').type(user)
  cy.get('#passwordField').type(password)
  cy.contains('Log In').click({force: true})
  generalFunction.logOut()
   }
  Then ...
})
```

You can write general methods for a set of tests and import them and use them as such.

```javascript
// e2e/cypress/pages/general.js

class generalFunctions {
  static logOut () {
    cy.contains('log Out').click({force: true})
  };

export default generalFunctions

//e2e/cypress/integration/test1/test1/test1.js

import generalFunctions ./../../pages/general.js
  generalFunction.logOut()
``` 
### Environment Variable  
We have adopted security measures by storing our log in infos and other private object properties in a file called cypress.env.json which does not get uploaded.  
A file with this name in the parent folder of cypress allows Cypress program to use any objects stored in the file as environmental variables.  
https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json  

```javascript
// e2e/cypress/integration/test1/test1.feature
Given('{string} logs in)', (email){
const users = Cypress.env('users')
user_Password = users[email][password]
}
```
```javascript
// e2e/cypress.env.json
{
  "users":{
    "email1@email.com": {
      "name": "Young Son" ,
      "password":"fake password"
    }
  }
```
### Installing/Updating From Submodule (Optional)
We keep a seperate gherkin feature folder and a repository that ensures only these tests are ran during testing.
e2e/gherkin-features

- git submodule init
 #This syncs the gherkin-features with the tests inside the cypress folder (optional)
- git submodule update
- npm run test:pull-features   
This will delete any Gherkin Feature files within the cypress/integration folder.  
This will not delete the cypress javascript file located within the cypress/integration/test.  
This will make sure only the tests within the Gherkin-Features will show up during the test run.  


Use your own submodule repo doing:
- git submodule add (YOUR_REPO_URL) gherkin-features
- git add --all
- git commit -m "Change repo url"

