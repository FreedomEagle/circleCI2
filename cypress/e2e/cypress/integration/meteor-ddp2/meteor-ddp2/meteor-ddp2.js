import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import executeCommand from '../../../common/execute-command'

Given(/^I execute a long task in my database$/, () => {
  executeCommand('db-command-long-task')
})

Given(/^I am at homepage$/, () => {
  cy.visit('/')
})

Given('There exists an account with {string}, {string}', (email,pw) =>{
  cy.contains('Sign in').click({forced:true})
  cy.get('#signup-link').click({forced:true})
  cy.get("input[id=login-username]").click().clear().type(email)
  cy.get("input[id=login-password]").click().clear().type(pw)
  cy.get("input[id=login-password-again]").click().clear().type(pw)
  cy.get('#login-buttons-password').click({force: true} )
  cy.contains('Close').click({forced:true})
})

Then('{string} with pw {string} logs in and logs out {int} times {string}', (email, pw, k, hypothesis) => {
  cy.visit('/')
  for(var i=0;i<k;i++){
    cy.contains('Sign in').click({forced:true})
    cy.get("input[id=login-username]").click().clear().type(email)
    cy.get("input[id=login-password]").click().clear().type(pw)
    cy.get('.login-button').click({force: true} )
    cy.get("#login-name-link").click({force: true} )
    cy.get('#login-buttons-logout').click({force: true} )
    if(hypothesis == 'succeeds'){
      cy.get('.error-message').should.not.be('visible')
    }

  }
})

When('{string} with pw {string} logs in and logs out {int} times {string}', (email, pw, k, hypothesis) => {
  cy.visit('/')
  for(var i=0;i<k;i++){
    cy.contains('Sign in').click({forced:true})
    cy.get("input[id=login-username]").click().clear().type(email)
    cy.get("input[id=login-password]").click().clear().type(pw)
    cy.get('.login-button').click({force: true} )
    cy.get("#login-name-link").click({force: true} )
    cy.get('#login-buttons-logout').click({force: true} )
    if(hypothesis == 'succeeds'){
      cy.get('.error-message').should.not.be('visible')
    }

  }
})
