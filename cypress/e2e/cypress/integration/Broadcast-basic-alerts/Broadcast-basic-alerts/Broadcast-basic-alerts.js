import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps'
import Share112 from '../../../pages/Share911/112-broadcast'

Given('Share911 is opened', () => {
  cy.viewport(1024, 768)
  const myConfig = Cypress.config()
  expect(myConfig).to.have.property('baseUrl')
  // expect(myConfig).to.have.property('baseUrl', 'https://foo.com/')

  // const rootUrl = Cypress.env('rootUrl')
  cy.visit(myConfig.baseUrl)
})

Given('{string} logs in', email => {
  const userList = Cypress.env('users')
  const user = userList[email]
  const password = user['password']
  Share112.loginInitial(email, password)
})

Given('{string} logs back in', email => {
  const userList = Cypress.env('users')
  const user = userList[email]
  const password = user['password']

  Share112.logBackIn(email, password)
})

And('invite(s) {string} and inputs basic info', (email) => {
  const userList = Cypress.env('users')
  const user = userList[email]
  const password = user['password']
  const userNum = user['phoneNum']
  const name = user['name']

  cy.inviteUser(email, password)
  Share112.addName(name)
  cy.lookFor(name)
  Share112.addPhone(userNum)
})

When('I view (the latest) alert receiver(s) for {string}', (channel) => {
  Share112.checkCallReport(channel)
  // cy.contains('td', '10:36:01 pm').siblings().contains('Receiver').click({ force: true })
})
When('view(s) (the latest) alert receiver(s) for {string}', (channel) => {
  Share112.checkCallReport(channel)
})
Then('voice calls to {string} should be completed', (label) => {
  Share112.checkCallLog(label)
  Share112.logOut()
  // cy.contains('th', 'Call status').closest('table')
  //   .contains('td', label).siblings().eq(3).should('match', /(initiated|ringing|in-progress|completed)/)
})

And('{string}, {string}, and {string} should receive a {string} alert message on their app for {string}', (email1, email2, email3, alertType, channel) => {
  const userList = Cypress.env('users')
  const user1 = userList[email1]
  const pw1 = user1['password']
  const user2 = userList[email2]
  const pw2 = user2['password']
  const user3 = userList[email3]
  const pw3 = user3['password']
  cy.wait(500)
  Share112.loginFirstTime(email1, pw1)
  cy.checkAlert(channel, alertType)
  Share112.logOut()
  cy.wait(2000)
  Share112.checkAlert(email2, pw2, channel, alertType)
  cy.wait(1500)
  Share112.checkAlert(email3, pw3, channel, alertType)
  cy.wait(1500)
})

And('(he)(she)(I)( also) receive(s) a {string} alert message on (their)(his)(her) app for {string}', (alertType, channel) => {
  cy.checkAlert(channel, alertType)
})

When('I view(s) alert receiver(s) from {string} and {string}', (time, date) => {
  cy.contains('After-Action Report').click({ force: true })
  cy.contains('2020-03-13').click({ force: true })
  cy.contains('td', '10:36:01 pm').siblings().contains('Receiver').click({ force: true })
})

Then('logs out', () => {
  Share112.logOut()
})

Given('open {string} channel', (channelName) => {
  Share112.accessChannel(channelName)
})

Given('an administrative member of {string} channel logs in with the info {string},{string}', (channel, email, password) => {
  cy.viewport(1024, 768)
  // cy.viewport(2560, 1600)
  Share112.visit()
  Share112.loginInitial(email, password)
  Share112.checkChannel(channel)
})
Given('the {string} channel has the type {string} with the zipcode {string}', (channel, type, zipcode) => {
  Share112.accessChannel(channel)
  Share112.checkChannelInfo('type', type)
  Share112.checkAddress('zip', zipcode)
})
And('a regular member {string} belongs to the channel {string} with the phone number {string}', (name, channel, phoneNumber) => {
  Share112.accessChannel(channel)
  cy.lookFor(name)
  Share112.checkUserProperty(name, phoneNumber)
})
And('the regular user {string} from {string} channel is authorized to {string}', (name, channel, permission) => {
  Share112.checkUserProperty(name, permission)
})

Given('the response agency {string}\'s number {string} is added to the {string} emergency voice calls', (responseAgency, phoneNumber, channel) => {
  Share112.accessChannel(channel)
  Share112.addVoiceCalls(responseAgency, phoneNumber)
})
Given('the respondant {string} belongs to {string} at {string} with the password {string} with phone number {string}', (respondant, responseAgency, email, password, phoneNum) => {
  Share112.logOutandIn(email, password)
  Share112.checkName(respondant)
  Share112.checkAgencyName(responseAgency)
})
And('the response agency shares the zipcode {string}', (zipcode) => {
  Share112.checkAgencyZip(zipcode)
})
When('the {string} logs in through {string} with the password {string}', (name, email, password) => {
  Share112.logOutandIn(email, password)
  Share112.checkName(name)
})
And('broadcasts a {string} alert for the {string} channel', (alert, channel) => {
  Share112.broadCastAlert(channel, alert)
})
Then('everyone in the channel {string} should have received a text', (channel) => {
  Share112.checkSMSandText()
})
Then('the response agency {string} is called', (responseAgency) => {
  Share112.checkCallLog(responseAgency)
})
And('(he)(she)(I) clear(s) event for {string}', (channel) => {
  Share112.accessChannel(channel)
  cy.clearEvents()
})
And('the administrator {string} with {string} removes {string} from {string} channel', (email, password, removedUser, channel) => {
  Share112.logOutandIn(email, password)
  Share112.removeUser(channel, removedUser)
  Share112.logOut()
})
And('removes {string} from {string} channel', (removedUser, channel) => {
  Share112.removeUser(channel, removedUser)
  Share112.logOut()
})
