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
        
        
        

    });
})

    