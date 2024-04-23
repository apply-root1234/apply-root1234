import herokuForm from "../../pages/herokuForm";
//import { faker } from '@faker-js/faker';
const csv = require('neat-csv')

let table;

describe('Registration Form', () => 
{
    before(() => {
        cy.fixture("users.csv").then(csv).then((data) => { table = data })
    })

        
    it ('Sign up and add contacts through CSV', () =>
    {
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
        herokuForm.signupCSV(table);
        //The table variable is declared to store the parsed CSV data.
        //1. Read the 'data.csv' file using cy.fixture.
        //2. The then(csv) part of the code parses the CSV data using the 'neat-csv' module and converts it into an array of objects.
        //3. The parsed data is then stored in the regData variable, making it accessible in the subsequent test case.
    });
    
    it.only ('Sign up and add contacts through api', () =>
    {
        cy.intercept ('GET', 'https://thinking-tester-contact-list.herokuapp.com/contacts', { fixture: "contacts.json"});
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
        herokuForm.signupAPI();
        cy.fixture('contacts.json').then((contacts) => {
            cy.get('.contactTableBodyRow').each(($row, index) => {
              // The JSON is an array and each object corresponds to a row
              const contact = contacts[index];
              const fullName = `${contact.firstName} ${contact.lastName}`;
              const address = `${contact.street1} ${contact.street2}`;
              const cityStatePostal = `${contact.city} ${contact.stateProvince} ${contact.postalCode}`;
          
              // Comparing each cell
              cy.wrap($row).find('td').eq(1).should('have.text', fullName);
              cy.wrap($row).find('td').eq(2).should('have.text', contact.birthdate); 
              cy.wrap($row).find('td').eq(3).should('have.text', contact.email);
              cy.wrap($row).find('td').eq(4).should('have.text', contact.phone);
              cy.wrap($row).find('td').eq(5).should('have.text', address);
              cy.wrap($row).find('td').eq(6).should('have.text', cityStatePostal);
              cy.wrap($row).find('td').eq(7).should('have.text', contact.country);
            });
          });
        
        

    });
})

    