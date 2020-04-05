'use strict'

// import ResultsPage from './911-wrong-email'
const EMAIL_FIELD = 'input[name=email]'
const GET_SHARE_911 = 'https://getshare911.com/'
const MAIN_CONTENT = '.main-content'
const IFRAME = 'iframe'

class SearchPage {
  static visit () {
    cy.visit(GET_SHARE_911)
  }

  static type (query) {
    cy.get(EMAIL_FIELD) // 2 seconds
      .type(query)
  }

  static downloadPage () {
    cy.contains('Download Desktop App').click({ force: true })
  }

  static contactPage () {
    cy.contains('Contact Us').click({ force: true })
  }

  static scrollDown () {
    cy.scrollTo('bottom').get('.history').click({ force: true }).get(MAIN_CONTENT)
  }

  static calendarVisible () {
    cy.get(MAIN_CONTENT).scrollIntoView().get(IFRAME).should('be.visible')
  }

  static phoneNumberVisible () {
    cy.get(MAIN_CONTENT).find('a').should('have.attr', 'href', 'tel: +1-(800) 469-3460')
  }
}

export default SearchPage
