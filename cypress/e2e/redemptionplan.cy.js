Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
  ) {
    return false; // ignore these exceptions
  }
  return true;
});

describe('Gift_and_voucher', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard', { timeout: 5000 }).should('be.visible');
    cy.contains('p', 'Redemption Plan')
      .parent() // go to <a> tag
      .click({ force: true });
  });

  it('should click Gift & Voucher link and verify redirect', () => {
    cy.get('#createBtn').click();
    cy.get('input[placeholder="Enter Point"]').type('3200');
    // Select "Cash" in the first redemption type (value "1")
cy.get('select[name="redumptionTypes[]"]').eq(0).select('Cash'); 

// Select "15000" in the first redemption value (value "98105")
cy.get('select[name="redumptionValues[]"]').eq(0).select('15000'); 

// Click to add another plan row
cy.get('#addPlanBtn').click();

// Select "Gift" in the second redemption type (value "2")
cy.get('select[name="redumptionTypes[]"]').eq(1).select('Gift'); 


// you need the exact value attribute of "916 GOLD COIN" (inspect the option to find its value)
cy.get('select[name="redumptionValues[]"]').eq(1).select('916 GOLD COIN');

    cy.get('#submitPlans').click();
    cy.get('#backButton').should('be.visible').click();
    cy.get('input[type="search"][aria-controls="planViewTable"]').type('916');
  });
});
