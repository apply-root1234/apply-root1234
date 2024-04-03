import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
  cy.get(`input[id="input-email"]`).type(email);
  cy.get(`input[id="input-password"]`).type(password);
  cy.get(`input[type="submit"]`).click();
  
});

Cypress.Commands.add('search', (term) => {
  cy.get(`input[type="text"]`).type(term);
  cy.get(`span[class="input-group-btn"]`).click();
});

Cypress.Commands.add('logout', () => {
  // 1. ensure the dropdown is open
  cy.get('a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/logout"]').parents('.list-inline').click();
  
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