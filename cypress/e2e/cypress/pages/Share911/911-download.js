'use strict'

// import ResultsPage from './911-wrong-email'

const GET_SHARE_911 = 'https://getshare911.com/'
const DOWNLOAD_LINK = 'https://cdn.share911.com/windows/Share911+Setup+1.0.13.exe'
class SearchPage {
  static visit () {
    cy.visit('/')
  }

  static redirectToGetShare911 () {
    cy.visit(GET_SHARE_911).contains('Download Desktop App').click()
  }

  static downloadLink () {
    cy.contains(DOWNLOAD_LINK).click()
  }
}

export default SearchPage
