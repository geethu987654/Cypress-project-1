Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
  ) {
    return false; // Ignore these exceptions to prevent test failures
  }
  return true;
});

describe('Stock Item Management', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com');
    cy.get('input[name="password"]').type('2025ACCESS');
    cy.get('button[type="submit"]').click();
    cy.contains('Dashboard', { timeout: 1000 }).should('be.visible');
  });

  it('Creates new Stock Item and handles redirect or back navigation accordingly', () => {
    cy.get('a.nav-link[data-widget="pushmenu"]').click();
    cy.contains('a.nav-link', 'Stock Item Details').click();
    cy.get('.nav-treeview').contains('a', 'Stock Item').should('be.visible').click();

    cy.get('#createBtn').click();
    cy.get('input[name="itemCode"]:visible').type('Ts2');
    cy.get('input[name="itemName"]:visible').type('TESTStock2');
    cy.get('#categorySelect').select('plastic');
    cy.get('#subCategorySelect').select('bin');
    cy.get('#unitSelect').select('PCS');
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('button', 'Submit').click();

    // Wait and check if redirected to stock items grid page
    cy.url({ timeout: 10000 }).then(currentUrl => {
      if (currentUrl.includes('/qaloyaltymanagement/getAllItemView')) {
        // Redirected to grid page — no Back button click needed
        cy.log('Redirected to stock items grid');
      } else {
        // Not redirected (duplicate or error), click Back button if visible
        cy.get('button#backButton').then($btn => {
          if ($btn.is(':visible')) {
            cy.wrap($btn).click();
            cy.log('Clicked Back button due to no redirect');
          } else {
            cy.log('Back button not visible to click');
          }
        });
      }
    });

    // Search for the inserted item whether redirected or after back
    cy.get('input[type="search"][aria-controls="stockTable"]').type('TESTStock2');
    cy.contains('TESTStock2').should('be.visible');
  });
});
