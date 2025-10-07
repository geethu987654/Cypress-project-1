Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
  ) {
    return false; // Ignore these exceptions to prevent test failures
  }
  return true;
});

describe('agent', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');

    // Navigate through menu: click Agent Details then Agent
    cy.contains('p', 'Agent Details').parent('a').click({ force: true });
    
// Adjust below selector as per actual HTML structure
cy.contains('Agent').should('be.visible').click({ force: true });
cy.url({ timeout: 10000 }).should('include', '/viewAgentData');;
  });

  it('should load Agent page after login and filter Agent Group table', () => {
    cy.contains('Agent').should('be.visible');

    // Type search filter on the agentGroupTable search input field
    cy.get('input[type="search"][aria-controls="agentGroupTable"]').type('owner');
  });
});
