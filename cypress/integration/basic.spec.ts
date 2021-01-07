describe('Basic test', () => {
  before(() => {
    cy.setVtexIdCookie()
  })

  it('adds custom bell to cart', () => {
    // navigate to home page
    cy.visit('/')

    // search for "bell"
    cy.get('#downshift-0-input')
      .type('bell{enter}')

    // wait until search results are loaded
    cy.get('#europe', { timeout: 10000 })

    // find Custom Bell product summary
    cy.get('section.vtex-product-summary-2-x-container')
      .contains('Custom Bell')
      .within(() => {
        // click Add to cart button
        cy.get('button')
          .contains('Add to cart')
          .click()
      })

    // assert that the product was added to the cart
    cy.get('.vtex-toast')
      .should('contain.text', "Item added to your cart")
  })
})
