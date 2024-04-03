//import commands from "../../support/commands";
/*
- Create a Cypress custom command to Login the following website: https://naveenautomationlabs.com/opencart/index.php?route=account/login 
- After login, search for the item: Macbook, on the search bar. 
- Create a Cypress custom command to Logout from the website.
- Use credentials: applytesters@mydomain.com / Apply123!!!
- Login, Search and Logout must be called on the same TC (4 - 5 Lines Max).

*/
describe('Login Test', () => {
    it('Click and type on the email and password fields', () => 
    {
      cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
      cy.login('applytesters@mydomain.com','Apply123!!!');
      cy.search('Macbook');
      cy.logout();
    });
  });
