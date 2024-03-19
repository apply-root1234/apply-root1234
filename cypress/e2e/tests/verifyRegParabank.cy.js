import regParabank from "../../pages/regParabank";
import { faker } from '@faker-js/faker';
it ('Validate contact form', () =>
{
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    regParabank.validateFields();

});

it ('Type fields with fake data', () =>
{
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    const user = 'Auto_Testing';
    const pass = 1234;

    //const user = faker.internet.userName();
    //const pass = faker.internet.password();

    regParabank.generateData(user, pass);
});


    