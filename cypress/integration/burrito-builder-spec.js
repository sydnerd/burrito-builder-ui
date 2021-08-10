describe('Main page', () => {
  beforeEach(() => {
    cy.fixture('ordersMock').then((testOrders) => {
      cy.intercept('http://localhost:3001/api/v1/orders', testOrders)
      cy.visit('http://localhost:3000')
    })
  })
  it('Should be able to visit the page and render the title', () => {
    cy.get('h1')
      .contains('Burrito Builder')
  })
  
  it('Should have a form with a name input, and 12 different ingredient options', () => {
    cy.get('form').should('be.visible')
    cy.get('.ingredient-button').should(($b) => {
      expect($b).to.have.length(12)
    })
    cy.get('.name-input').should('exist').should('be.visible')
  })

  it('Should display your selection', () => {
    cy.get('.order-selection').contains('Order: Nothing selected')
  })
  
  it('Should have a clickable submit button', () => {
    cy.get('.submit-button')
      .click()
  })

  it('Should have 2 existing order cards for Pat and Sam', () => {
    cy.get('.order')
      .should(($o) => {
        expect($o).to.have.length(2)
      })
      .should('be.visible')



  })
})

//Need to test:
  //1. Submitting a new order
  //test that the new card showed up
  //maybe test the order selection updates as well 