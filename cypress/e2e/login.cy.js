// ?? Ignore uncaught exceptions from the app (like Bootstrap/jQuery error)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Only ignore the Bootstrap jQuery error
  if (err.message.includes("Bootstrap's JavaScript requires jQuery")) {
    return false
  }
  // For any other error, let Cypress fail the test
})

describe('Login Tests with Excel Data', () => {

  before(() => {
    // Clear previous report at start
    cy.task("writeReport", { message: "=== Login Test Report ===\n" });
  });

  it('should test invalid login cases from Excel', () => {
    cy.task('readExcel', {
      filePath: 'cypress/fixtures/loginData.xlsx',
      sheetName: 'Sheet1'
    }).then((rows) => {
      rows.forEach((row, index) => {
        cy.visit('http://202.88.237.202:4546/qaloyaltymanagement/');

        if (row.email) {
          cy.get('input[name="email"]').clear().type(row.email);
        }
        if (row.password) {
          cy.get('input[name="password"]').clear().type(row.password);
        }

        cy.get('button[type="submit"]').click();

        cy.wait(1000);

        cy.url().then((url) => {
          if (url.includes('/login-auth')) {
            // ? Login blocked = expected
            cy.task("writeReport", {
              message: `Test #${index + 1} | Email=${row.email} | Password=${row.password} ? PASSED (Blocked)`
            });
          } else {
            // ? Login succeeded with invalid data
            cy.task("writeReport", {
              message: `Test #${index + 1} | Email=${row.email} | Password=${row.password} ? FAILED (Unexpected Success)`
            });
          }
        });
      });
    });
  });
});
