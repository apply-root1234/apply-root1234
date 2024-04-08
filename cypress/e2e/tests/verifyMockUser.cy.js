

describe("API Mocking in Cypress using cy.intercept Method ", () => {

  
    it("Mock ID 1", () => {
      cy.visit("https://jsonplaceholder.typicode.com/");
      cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/1", {fixture: "mockUser1.json"});
      cy.get(".id").should('eq', "1")
      cy.get(".title").should('eq',"Post 1");
      cy.get(".body").should('eq',"This is the first post");
      
    
    it("Mock ID 2", () => {
      cy.visit("https://jsonplaceholder.typicode.com/");
      cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/2", {fixture: "mockUser2.json"});
      cy.get(".id").should('eq', "2")
      cy.get(".title").should('eq',"Post 2");
      cy.get(".body").should('eq',"This is the second post");
    });
  
  });

});