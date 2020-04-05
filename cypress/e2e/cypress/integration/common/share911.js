import { Given, When } from 'cypress-cucumber-preprocessor/steps'

Given(/^I am at homepage/, () => {
  cy.visit('/')
})

When(/^I input 'myEmail@email.com'$/, () => {
  SearchPage.type('myEmail@email.com')
})

When(/^Press 'Search'$/, () => {
  SearchPage.pressSearch()
})
