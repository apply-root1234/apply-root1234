
import { faker } from '@faker-js/faker';
class herokuForm

{
    elements = 
    {
        signupBtn: () => cy.get('#signup'),
        cancelBtn: () => cy.get('#cancel'),
        firstName: () => cy.get('#firstName'),
        lastName: () => cy.get('#lastName'),
        email: () => cy.get('#email'),
        password: () => cy.get('#password'),
        submitBtn: () => cy.get('#submit'),
        cancelBtn: () => cy.get('#cancel'),
        errorMsg: () => cy.get('#error'),
        addcontactBtn: () => cy.get('#add-contact'),
        birthDate: () => cy.get('#birthdate'),
        phone: () => cy.get('#phone'),
        street1: () => cy.get('#street1'),
        street2: () => cy.get('#street2'),
        city: () => cy.get('#city'),
        state: () => cy.get('#stateProvince'),
        zipcode: () => cy.get('#postalCode'),
        country: () => cy.get('#country'),
        logout: () => cy.get('#logout')

    }

    signupProcess(user,name,regData)
    {
        this.elements.signupBtn().click();
        this.elements.cancelBtn().click(); //check cancel button first
        this.elements.signupBtn().click();
        this.elements.firstName().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.lastName().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.email().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.password().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.submitBtn().should('exist').should('be.visible').should('not.be.disabled');
        this.elements.cancelBtn().should('exist').should('be.visible').should('not.be.disabled');

        cy.log('Validating form cannot be sent blank');
        this.elements.submitBtn().click();
        this.elements.errorMsg().should('contain','User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.');
        this.elements.firstName().type(faker.person.firstName());
        this.elements.lastName().type(faker.person.lastName());

        cy.log('Validating form cannot be sent with any character in email field');
        this.elements.email().type('abcd');
        const randomPass = Math.floor(Math.random() * 999999); // Generate age between 0 and 999999
        this.elements.password().type(randomPass);
        this.elements.submitBtn().click();
        this.elements.errorMsg().should('contain',`is shorter than the minimum allowed length (7).`);
        this.elements.errorMsg().should('contain',`Email is invalid`); //if I put this one first, the error msg looks different
        
        cy.log('Sending correct data');
        this.elements.email().clear();
        this.elements.password().clear();
        this.elements.email().type(faker.internet.email());
        this.elements.password().type(faker.internet.password());
        this.elements.submitBtn().click();

        this.validateForm();
        this.addContacts(regData);
        this.elements.logout().click();

    };

    validateForm()
    {
        this.elements.addcontactBtn().click();
        this.elements.cancelBtn().click();
        this.elements.addcontactBtn().click();
        cy.log('Validating form cannot be sent blank');
        this.elements.submitBtn().click();
        this.elements.errorMsg().should('contain','Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.');
    }

    
    addContacts(regData)
    {

        for (let i = 0; i < regData.length; i++) 
         {
            this.elements.addcontactBtn().click();
            this.elements.firstName().type(regData[i]['firstName']);
            this.elements.lastName().type(regData[i]['lastName']);
            this.elements.birthDate().type(regData[i]['birthDate']);
            this.elements.email().type(regData[i]['email']);            
            this.elements.phone().type(regData[i]['phone']);
            this.elements.street1().type(regData[i]['street1']);
            this.elements.street2().type(regData[i]['street2']);
            this.elements.city().type(regData[i]['city']);
            this.elements.state().type(regData[i]['state']);
            this.elements.zipcode().type(regData[i]['zipcode']);
            this.elements.country().type(regData[i]['country']);
            this.elements.submitBtn().click();
            cy.wait(1000);
        }
    }
}
module.exports = new herokuForm();