const RESULT_LINK = 'h3'
const ALERT_CLASS = '.alert-danger'
const WINDOW_DOWNLOAD_LINK = 'https://cdn.share911.com/windows/Share911+Setup+1.0.13.exe'

class ResultsPage {
  static expect () {
    return {
      toHaveResults: () => {
        cy.get(RESULT_LINK).its('length').then((length) => {
          expect(length).to.be.greaterThan(5)
        })
      },
      toHaveErrors: () => {
        cy.get(ALERT_CLASS).should('be.visible')
      },
      haveDownloadLink: () => {
        cy.contains(WINDOW_DOWNLOAD_LINK).should('be.visible')
      },

    }
  }
}

export default ResultsPage
