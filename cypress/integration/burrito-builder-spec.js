
  beforeEach(() => {
    cy.fixture('ordersMock').then((testOrders) => {
      cy.intercept('http://localhost:3001/api/v1/orders', testOrders)
      cy.visit('http://localhost:3000')
    })
  });
  describe('Main page', () => {
  it('Should be able to visit the page and render the title', () => {
    cy.get('h1')
      .contains('Burrito Builder')
  });
  
  it('Should have a form with a name input, and 12 different ingredient options', () => {
    cy.get('form').should('be.visible')
    cy.get('.ingredient-button').should('have.length', '12')
    cy.get('.name-input').should('exist').should('be.visible')
  });

  it('Should display your selection', () => {
    cy.fixture('newOrderMock').then((testNewOrders) => {
      cy.intercept('http://localhost:3001/api/v1/orders', testNewOrders)
      cy.get('input[name="name"]')
        .type('Sydney')
        .should('have.value','Sydney')
        .get('.ingredient-button')
        .eq(0)
        .click()
        .get('.ingredient-button')
        .eq(4)
        .click()
        .get('.ingredient-button')
        .eq(2)
        .click()
      cy.get('.order-selection').contains('Order: beans, lettuce, carnitas')
    });
  })

  it('Should display no order selected if nothing is selected', () => {
    cy.get('.order-selection').contains('Order: Nothing selected')
  })
  
  it('Should have a clickable submit button', () => {
    cy.get('.submit-button')
      .click()
  });

  it('Should have 2 existing order cards for Pat and Sam', () => {
    cy.get('.order')
      .should(($o) => {
        expect($o).to.have.length(2)
      })
      .should('be.visible')
  });

  // it('Should say nothing selected if user only inputs name and no ingredients', () => {
  //   cy.get('input[name="name"]')
  //     .type('Sydney')
  //     .should('have.value','Sydney')
  //   cy.get('.submit-button')
  //     .click()
  //   cy.get('')
  // })
})

// describe('POST requests', () => {
//   beforeEach(() => {
//     cy.intercept("POST", 'http://localhost:3001/api/v1/orders', 
//     {
//       statusCode: 201,
//       body: {
//         orders: [{id: 5,name: "Sydney",ingredients: ["beans","lettuce","carnitas"]}]
//       }
//     })
//     cy.visit('http://localhost:3000/')
//   })

//   it('Should submit an order after inputing a name and at least on ingredient', () => {
//       cy.visit('http://localhost:3000/')
//         cy.get('.order').should('have.length', '2');
//         cy.get('input[name="name"]')
//         .type('Sydney')
//         .should('have.value','Sydney')
//         .get('.ingredient-button')
//         .eq(0)
//         .click()
//         .get('.ingredient-button')
//         .eq(4)
//         .click()
//         .get('.ingredient-button')
//         .eq(2)
//         .click()
//         .get('.submit-button')
//         .click()
//         cy.get('.order').should('have.length', '3');
//   })   
// })

  