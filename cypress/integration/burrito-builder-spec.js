describe('Main page', () => {
  beforeEach(() => {
    crypto.fixture('ordersMock').then((testOrders) => {
      cy.intercept('http://localhost:3001/api/v1/orders', testOrders)
      cy.visit('http://localhost:3000')
    })
  })
})