'use strict'

const EMAIL_FIELD = 'input[type=email]'
const PASSWORD_FIELD = 'input[type="password"]'
const SUBMIT = 'button[type=submit]'
const QAWebsite = 'https://share112.com/'
// const slideoutButton = '#slideoutButton'
// const bulkSubmitBut = 'button[id=submit]'
const logInToDiffAcct = 'a[data-action="login-to-different-account"]'
const broacastSubmit = 'button[id=submit]'
const statusBar = '.status-bar-alert'
// const entirePage = '#mainLayout'
const contactSearch = 'div [class=name]'
const errorIcon = '.jq-icon-error'
const firstName = 'input[name="profile.firstname"]'
const lastName = 'input[name="profile.lastname"]'
const voiceInput1 = 'input[id="voiceNumbers-label-1"]'
const voiceNum1 = 'input[id="voiceNumbers-number-1"]'
const voiceDrill1 = 'input[id="voiceNumbers-drills-1"]'
const nameFieldFrontPage = 'a[id="display-name-link"]'
// const nameFormField = 'input [name="name"]'

class Share112 {
  static visit () {
    cy.visit(QAWebsite)
  };

  static reset () {
    // For some reason the "Checking email..." message sometimes never changes
    // so we "help" it along by going to a different page and back again.
    cy.wait(500)
    cy.contains('Forgot password?').click()
    cy.wait(500)
    cy.contains('Cancel').click()
    cy.wait(500)
  }

  static loginInitial (id, pw) {
    cy.get(EMAIL_FIELD).click().type(id)
    cy.get(SUBMIT).click()
    cy.get(PASSWORD_FIELD).click().type(pw)
    cy.get(SUBMIT).click()
    cy.wait(500)
  };

  static loginFirstTime (id, pw) {
    cy.get(logInToDiffAcct).click()
    cy.get(EMAIL_FIELD).click().type(id)
    cy.get(SUBMIT).click()
    cy.get(PASSWORD_FIELD).click().type(pw)
    cy.get(SUBMIT).click()
    cy.wait(500)
    cy.get('.btn').click({ force: true })
  };

  static checkChannel (channel) {
    cy.get('.home').should('contain', channel)
  };

  static accessChannel (channel) {
    cy.contains(channel).click({ force: true })
  };

  static checkAgencyName (responseAgency) {
    cy.contains('Agency Info').click({ force: true })
    cy.get('.home').should('contain', responseAgency)
  };

  static checkAgencyZip (zipcode) {
    cy.contains('Agency Info').click({ force: true })
    cy.wait(500)
    cy.get('.zips-mlText').first().should('have.value', zipcode)
  };

  static addName (name) {
    cy.contains('Manage Profile').click({ force: true })
    cy.get(firstName).clear().type(name.split(' ')[0])
    cy.get(lastName).clear().type(name.split(' ')[1])
    cy.contains('Done').click({ force: true })
  };

  static addPhone (phoneNumber) {
    cy.contains('Manage Profile').click({ force: true })
    cy.wait(500)
    cy.get('#mobile').clear().type(phoneNumber)
    cy.contains('Done').click()
  };

  static checkName (name) {
    cy.get(nameFieldFrontPage).should('contain', name)
  };

  static updateProfile (propertyField, propertyValue) {
    cy.contains('Update my Profile').click({ force: true })
    cy.get('#' + propertyField).clear().type(propertyValue)
    cy.contains('Done').click({ force: true })
  }

  static checkUserProperty (name, propertyValue) {
    cy.get(contactSearch).contains(name).parent().parent().should('contain', propertyValue)
  }

  static checkChannelInfo (propertyField, propertyValue) {
    cy.contains('Manage Channel').click({ force: true })
    cy.contains('Channel Info').click({ force: true })
    cy.get('#' + propertyField).should('contain', propertyValue)
  }

  static checkAddress (propertyField, propertyValue) {
    cy.contains('Manage Channel').click({ force: true })
    cy.contains('Address').click({ force: true })
    cy.get('#' + propertyField).clear().click().type(propertyValue)
    cy.contains('Channel Address').click({ force: true })
    cy.get(errorIcon).should('not.be.visible')
  }

  static addVoiceCalls (responseAgency, phoneNum) {
    cy.contains('Manage Channel').click({ force: true })
    cy.contains('Voice Calls').click({ force: true })
    cy.get(voiceInput1).clear().click().type(responseAgency)
    cy.get(voiceNum1).clear().click().type(phoneNum)
    cy.get(voiceDrill1).click()
    cy.contains('Voice Calls').click({ force: true })
    cy.get(errorIcon).should('not.be.visible')
  }

  static logOut () {
    cy.contains('Sign out').click({ force: true })
  }

  static logOutandIn (email, password) {
    Share112.logOut()
    Share112.reset()
    cy.get(logInToDiffAcct).click()
    cy.get(EMAIL_FIELD).type(email)
    cy.get(SUBMIT).click()
    cy.get(PASSWORD_FIELD).type(password)
    cy.get(SUBMIT).click()
    cy.server({ enable: false })
  }

  static logBackIn (email, password) {
    cy.wait(1500)
    cy.get(logInToDiffAcct).click()
    cy.get(EMAIL_FIELD).click()
    cy.wait(1500)
    cy.get(EMAIL_FIELD).type(email)
    cy.get(SUBMIT).click()
    cy.wait(1000)
    cy.get(PASSWORD_FIELD).click()
    cy.get(PASSWORD_FIELD).type(password)
    cy.get(SUBMIT).click()
    cy.server({ enable: false })
  }

  static broadCastAlert (channel, alertType) {
    cy.contains(channel).click()
    cy.contains('Broadcast').click({ force: true })
    cy.contains(alertType).click()
    cy.get(broacastSubmit).click()
  }

  static checkAlert (email, password, channel, alertType) {
    Share112.logBackIn(email, password)
    cy.checkAlert(channel, alertType)
    Share112.logOut()
  }

  static checkCallReport (channel) {
    cy.contains(channel).click({ force: true })
    cy.get(statusBar).click()
    cy.contains('Receiver').click()
  }

  static checkSMSandText () {
    cy.contains('Received sms').parent().parent().parent().children('tbody').children('tr').each(function ($tr) {
      cy.get($tr).children('td').should($td => { expect($td[1].innerHTML).to.match(/(yes|pending)/) }
      )
    })
  }

  static checkCallLog (responseAgency) {
    // cy.waitUntil(() =>
    cy.wait(1500)
    cy.contains(responseAgency).parent().children('td').should($tdArray => {
      expect($tdArray[4].innerHTML).to.match(/(initiated|ringing|in-progress|completed)/)
    })
  }

  static removeUser (channel, user) {
    Share112.accessChannel(channel)
    cy.lookFor(user)
    cy.contains('Remove from Channel').click({ force: true })
  }

  static allowPermission (email, permissionType) {
    cy.lookFor(email)
    cy.contains('Manage Permissions').click({ force: true })
    cy.contains(permissionType).click({ force: true })
    cy.contains('Close').click({ force: true })
  }

  static clearChannel (email, permissionType) {
    cy.lookFor(email)
    cy.contains('Manage Permissions').click({ force: true })
    cy.contains(permissionType).click({ force: true })
    cy.contains('Close').click({ force: true })
  }
  // Need to pass propertyField and propertyValue...
  // static checkzip (zipcode) {
  //   cy.contains('Manage Channel').click({ force: true })
  //   cy.contains('Address').click({ force: true })
  //   cy.get('#' + propertyField).clear().click().type(propertyValue)
  //   cy.contains('Channel Address').click({ force: true })
  //   cy.get(errorIcon).should('not.be.visible')
  // }
}

export default Share112
