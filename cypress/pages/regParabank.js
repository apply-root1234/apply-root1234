
import { faker } from '@faker-js/faker';
class regParabank

{
    elements = 
    {
        firstName: () => cy.get('#customer\\.firstName'),
        lastName:  () => cy.get('#customer\\.lastName'),
        address:  () => cy.get('#customer\\.address\\.street'),
        city:  () => cy.get('#customer\\.address\\.city'),
        state:  () => cy.get('#customer\\.address\\.state'),
        zipCode:  () => cy.get('#customer\\.address\\.zipCode'),
        phoneNumber:  () => cy.get('#customer\\.phoneNumber'),
        ssn:  () => cy.get('#customer\\.ssn'),
        username:  () => cy.get('#customer\\.username'),
        password:  () => cy.get('#customer\\.password'),
        repeatedPassword:  () => cy.get('#repeatedPassword'),
        registerBtn: () => cy.get('input[type="submit"][value="Register"]'),
        logoutLink: () =>  cy.get('a[href="/parabank/logout.htm"]')
    }

    validateFields()
    {
        this.elements.firstName().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.lastName().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.address().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.city().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.state().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.zipCode().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.phoneNumber().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.ssn().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.username().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.password().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.repeatedPassword().should('exist').should('be.visible').should('not.be.disabled');
    };

    generateData(user,pass)
    {
        this.elements.firstName().type(faker.person.firstName());
        this.elements.lastName().type(faker.person.lastName());
        this.elements.address().type(faker.location.streetAddress());
        this.elements.city().type(faker.location.city());
        this.elements.state().type(faker.location.state());
        this.elements.zipCode().type(faker.location.zipCode());
        this.elements.phoneNumber().type(faker.phone.number());
        this.elements.ssn().type(faker.finance.creditCardNumber());
        this.elements.username().type(user);
        this.elements.password().type(pass);
        this.elements.repeatedPassword().type(pass);
        this.elements.registerBtn().click();
        this.elements.logoutLink().click();
    }

    loginAccount(user,pass)
    {

    }
}

module.exports = new regParabank();