Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore Bootstrap/jQuery/datepicker errors
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes("$(...).datepicker is not a function")
  ) {
    return false; // Prevent Cypress from failing the test
  }
  return true;
});

describe('agentpointrequestcy', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
    cy.contains('p', 'Agent Details').parent('a').click({ force: true });
    cy.contains('Agent Point Request').should('be.visible').click({ force: true });
    cy.url().should('include', '/viewRequestPointProfile');
    cy.contains('Agent Point Request').should('be.visible');
});

it('should load Agent Point Request page after login', () => {
    // Basic test to assert that Agent Point Request page content is visible
    cy.contains('Agent Point Request').should('be.visible');
    cy.wait(2000);
    cy.get('input[type="search"][aria-controls="pointReqTable"]').type('GEETHU');
    // Find the row with 'Geethu' and click the eye icon
  cy.contains('td', 'Geethu')
    .parent('tr')
    .find('i.fa-eye')
    .click();
    cy.wait(2000);
    cy.get('button.btn.btn-secondary').contains('Cancel').click();

    });
});
