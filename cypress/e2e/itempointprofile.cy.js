// Place this at the top of your spec or support/e2e.js for global exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
  ) {
    // Prevent these app-specific JS errors from failing the test
    return false;
  }
  // Let other errors fail the test
  return true;
});

describe('ITEMPOINTPROFILE', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    // Wait and assert Dashboard appears
    cy.contains('Dashboard', { timeout: 5000 }).should('be.visible');
  });

  it('Creates new Stock Item and handles redirect or back navigation', () => {
    // Open the sidebar menu
    cy.get('a.nav-link[data-widget="pushmenu"]').click();
    // Navigate to Stock Item Details
    cy.contains('a.nav-link', 'Stock Item Details').click();
    cy.get('.nav-treeview').contains('a', 'Item Point Profile').should('be.visible').click();
    // Click create and wait for the creation panel
    cy.get('#createBtn').should('be.visible').click();
    cy.get('#collapseCreate', { timeout: 10000 }).should('be.visible');
    // Open the Add Profile modal
    cy.get('[data-toggle="modal"][data-target="#addItemProfileModal"]').should('be.visible').click();
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    cy.get('.modal-title').should('contain', 'Add Profile');
    // Fill and submit the profile form
    cy.get('input[placeholder="Enter Profile Name"]')
      .should('be.visible')
      .clear()
      .type('def profile');
    cy.get('.modal-content').find('button[type="submit"]').click();
    // Wait briefly to allow any toast to appear
    cy.wait(1000);
    cy.get('button.close[data-dismiss="modal"]').filter(':visible').click();
    // Confirm modal is closed before continuing
    cy.get('#addItemProfileModal').should('not.be.visible');
    // Proceed with selecting profile, category, and subcategory
    cy.get('#profileCreate').should('be.visible').select('LOYAL CUSTOMER');
    cy.get('#categorySelect').should('be.visible').select('plastic');
    cy.get('#subCategorySelect').should('be.visible').select('bin');
    // Type points for "small bin 1"
    cy.get('input[name="points[1827]"]')
      .should('be.visible')
      .clear()
      .type('15');
    // Type points for "big bin"
    cy.get('input[name="points[1828]"]')
      .should('be.visible')
      .clear()
      .type('22');
    // Type points for "TESTStock2"
    cy.get('input[name="points[1831]"]')
      .should('be.visible')
      .clear()
      .type('34');
    // Click the Submit button to save the points
    cy.get('#submitPointsButton').should('be.visible').click({ force: true });
    //cy.get('#collapseCreate').should('not.have.class', 'show');
    // (Optional if Back button is needed instead of auto collapse)
    cy.get('#backButton').should('be.visible').click();
    //cy.get('#collapseCreate').should('not.have.class', 'show');
    // Search for "TESTStock2"
    cy.get('input[type="search"][aria-controls="itempointtable"]').should('be.visible').clear().type('TESTStock2');
    cy.get('#itempointtable tbody tr')
      .filter((index, row) => {
        return Cypress.$(row).find('td:nth-child(3)').text().trim() === 'TESTStock2';
      })
      .first()
      .within(() => {
        cy.get('i.fa-eye.action-fa-icons[data-action="view"]').click({ force: true });
      });
    cy.wait(2000); // Wait for 2 seconds after the modal opens
    cy.get('button.close[data-dismiss="modal"]:visible').click();
    cy.get('#itempointtable tbody tr')
      .filter((index, row) => Cypress.$(row).find('td:nth-child(3)').text().trim() === 'TESTStock2')
      .first()
      .within(() => {
        cy.get('i.fa-pencil-alt.action-fa-icons[data-action="edit"]').click();
        cy.wait(2000);
        cy.get(
      });
  }); // End of 'it' block
});   // End of 'describe' block
