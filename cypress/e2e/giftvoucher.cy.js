Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes("Bootstrap's JavaScript requires jQuery") ||
    err.message.includes('toastr is not defined')
  ) {
    return false; // Ignore these exceptions to prevent test failures
  }
  return true;
});

describe('Gift_and_voucher', () => {
  beforeEach(() => {
    cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');
    cy.get('input[name="email"]').type('loyaloc@gmail.com', { log: false });
    cy.get('input[name="password"]').type('2025ACCESS', { log: false });
    cy.get('button[type="submit"]').click();
    // Wait and assert Dashboard appears
    cy.contains('Dashboard', { timeout: 5000 }).should('be.visible');
    cy.contains('p', 'Stock Item Details')
      .parent() // go to <a> tag
      .click({ force: true });

    cy.get('a.nav-link[href="http://202.88.237.202:4546/qaloyaltymanagement/viewGiftVoucher"]')
      .click();
    cy.url().should('include', '/viewGiftVoucher');
    // Optionally verify the page content after redirect
    cy.contains('Gift & Voucher').should('be.visible');
  });

  it('should click Gift & Voucher link and verify redirect', () => {
    
    cy.get('#createBtn').click();
  cy.wait(1000); // Wait for 2 seconds, adjust if the loader is dynamic

  // Select Redemption Type from dropdown
  //cy.get('select[name="redumptionType"]').select('Select Type'); // Replace with actual option value/text needed
  cy.get('#redumptionType').select('Gift');

  // Enter Scheme Name
  cy.get('input[placeholder="Enter scheme name"]').type('wagnor');

  // Upload an image if required; can be skipped if not automating file upload here
   //cy.get('input[type="file"]').attachFile('path/to/file.jpg'); // Needs cypress-file-upload plugin

  // Click Submit button
  cy.get('button[type="submit"]:visible').click();
  cy.wait(2000)
  cy.get('button').contains('Back').click();
  cy.get('input[type="search"][aria-controls="giftVoucherTable"]').type('wag');
  //click the eye icon
  cy.get('#giftVoucherTable tbody tr')  // Get all rows in the table body
  .contains('td', 'wag')               // Find the td that contains 'wag' in the Scheme Name column
  .parent('tr')                       // Go to the parent row of that cell
  .within(() => {
    cy.get('i.fa-eye.action-fa-icons').click();  // Click the eye icon inside that row
    // Wait for 2 seconds to let modal content settle

// Try closing by header X button
//cy.get('button.close[data-dismiss="modal"]').click({ force: true });
cy.get('.modal-content').should('be.visible');
// If modal still visible, try footer Close button
cy.get('button.btn-secondary[data-dismiss="modal"]').click({ force: true });

  });
});

});