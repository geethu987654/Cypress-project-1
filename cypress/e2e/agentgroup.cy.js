Cypress.on('uncaught:exception', (err, runnable) => {
if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
) {
    return false; // Ignore these exceptions to prevent test failures
}
return true;
});

describe('agentgroup', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
    cy.contains('p', 'Agent Details').parent('a').click({ force: true });
    cy.contains('Agent Group').should('be.visible').click({ force: true });
    cy.url().should('include', '/viewAgentGroup');
    cy.contains('Agent Group').should('be.visible');

});

it('should load Agent Group page after login', () => {
    // Basic test to assert that Agent Group page content is visible
    cy.contains('Agent Group').should('be.visible');
    // Click the Create button by its id
    cy.get('#createBtn')
    .should('be.visible')
    .click();
    // Optionally assert something after clicking, e.g. the collapse panel expands
    cy.get('#collapseCreate').should('have.class', 'show');
    cy.get('#groupName').should('be.visible').type('construction owner test1');
    cy.get('#submitAgent').should('be.visible').click();
    cy.get('#backButton').should('be.visible').click();
    cy.get('input[type="search"][aria-controls="agentGroupTable"]').type('owner');

 });
});
