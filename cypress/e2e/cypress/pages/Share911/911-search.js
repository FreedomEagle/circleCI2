const EMAIL_FIELD = 'input[type=email]'
const SUBMIT = 'button[type=submit]'

class SearchPage {
  static visit () {
    cy.visit('/')
  }

  static forgotPW () {
    cy.contains('Forgot password?').click()
  }

  static type (query) {
    cy.get(EMAIL_FIELD) // 2 seconds
      .type(query)
  }

  static downloadLink () {
    cy.contains('Download Desktop App').click()
  }

  static pressSearch () {
    cy.get(SUBMIT).click()
  }
}

export default SearchPage
