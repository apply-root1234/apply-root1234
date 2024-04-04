import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => 
{
  cy.get(`input[id="input-email"]`).type(email);
  cy.get(`input[id="input-password"]`).type(password);
  cy.get(`input[type="submit"]`).click();
  cy.log('******** Validating URL after logging in ********');
  cy.url().should('eq','https://naveenautomationlabs.com/opencart/index.php?route=account/account');
});

Cypress.Commands.add('search', (term) => {
  cy.get(`input[type="text"]`).type(term);
  cy.get(`span[class="input-group-btn"]`).click();
  cy.get('#input-search').invoke('val').then((actualValue) => {
    expect(actualValue).to.eq(term);
  });
  cy.get('h1').should('contain',term);
});

Cypress.Commands.add('logout', () => {
  cy.get('a[title="My Account"]').click();
  cy.get('a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/logout"]').click();
  cy.url().should('eq','https://naveenautomationlabs.com/opencart/index.php?route=account/logout');  
  cy.contains('a', 'Continue').click();
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })