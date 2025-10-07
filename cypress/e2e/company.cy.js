Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes("toastr is not defined")
  ) {
    return false; // Ignore these errors and don't fail the test
  }
  return true;
});

describe('Company Management and Territory Module', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com');
    cy.get('input[name="password"]').type('2025ACCESS');
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard').should('be.visible');
  });

  it('Navigates to Main Company page and waits 5 seconds', () => {
    cy.contains('a', 'Company Management').click({ force: true });
    cy.contains('a', 'Main Company').click();
    cy.url().should('include', '/viewCompanyDetails');
    cy.contains('Main Company').should('be.visible');
    cy.wait(5000);
  });

  it('Creates territory, goes back, views list and verifies new territory', () => {
    // Expand Company Management menu and go to Territory page
    cy.contains('a', 'Company Management').click({ force: true });
    cy.contains('a', 'Territory').click({ force: true });
    cy.url().should('include', '/viewTerritory');
    cy.contains('Territory').should('be.visible');

    // Click Create button
    cy.contains('button', 'Create').should('be.visible').click();

    // Select Kerala and Kannur
    cy.get('select').eq(0).select('Kerala');
    cy.get('select').eq(1).select('Kannur');

    // Type territory name "kannur4"
    cy.get('input[placeholder="Enter"]').type('kannur4');

    // Click Add button
    cy.contains('button', 'Add').should('be.visible').click();

    // Click Back button
    cy.contains('button', 'Back').should('be.visible').click();

    // Click View (eye icon) in Action column
    cy.get('td .fa-eye').first().click();

    // Assert the newly added territory is visible
    cy.contains('td', 'Kannur').scrollIntoView().should('be.visible');
    cy.contains('td', 'kannur4').scrollIntoView().should('be.visible');
  });
});
