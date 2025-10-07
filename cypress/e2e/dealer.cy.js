Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes("toastr is not defined")
  ) {
    return false;
  }
  return true;
});

describe('Dealer Module', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com');
    cy.get('input[name="password"]').type('2025ACCESS');
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard').should('be.visible');
  });

  function createDealer({ dealerCode, dealerName, contactPerson, contactNumber, territory }) {
    cy.contains('a', 'Dealer').should('be.visible').click({ force: true });
    cy.url().should('include', '/viewDealer');
    cy.contains('button', 'Create Dealer').should('be.visible').click();

    cy.get('input[name="dealerCode"]:visible').clear().type(dealerCode);
    cy.get('input[name="dealerName"]:visible').clear().type(dealerName);
    cy.get('input[name="contactPersonName"]:visible').clear().type(contactPerson);
    cy.get('input[name="contactNumber"]:visible').clear().type(contactNumber);
    cy.get('select#territorySelect').select(territory);

    cy.contains('button', 'Submit').scrollIntoView().click();

    cy.scrollTo('top');

    // Check for toast message
    cy.get('body', { timeout: 10000 }).then($body => {
      const toast = $body.find('.toast-message');

      if (toast.length > 0) {
        cy.wrap(toast).then($t => {
          const text = $t.text().toLowerCase();

          if (text.includes('already exists')) {
            cy.log('? Duplicate dealer entry detected, stopping test.');
            throw new Error('Duplicate dealer detected. Test stopped.');
          } else if (text.includes('dealer inserted successfully')) {
            cy.log('? Dealer inserted successfully.');
          } else {
            cy.log(`?? Toast message: ${text}`);
          }
        });
      } else {
        cy.log('?? No toast message appeared.');
      }
    });

    // Handle 'Saving Data...' spinner if it appears briefly
    cy.get('body').then($body => {
      if ($body.find(':contains("Saving Data...")').length > 0) {
        cy.contains('Saving Data...', { timeout: 15000 }).should('not.exist');
        cy.log('? "Saving Data..." spinner appeared briefly and disappeared.');
      } else {
        cy.log('? "Saving Data..." spinner did not appear.');
      }
    });
  }

  it('Creates dealer entry with manual input', () => {
    createDealer({
      dealerCode: 'rinu',
      dealerName: 'rinu consultancy',
      contactPerson: 'riii',
      contactNumber: '8959742321',
      territory: 'kannur3'
    });

    cy.wait(2000);

    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/viewDealer');
    cy.get('input[type="search"][aria-controls="dealerTable"]')
  .clear()
  .type('rinu consultancy');

  // Verify the dealer appears in the table results
cy.contains('td', 'rinu consultancy').should('be.visible');
  });
});
