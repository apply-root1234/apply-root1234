import herokuForm from "../..pages/herokuForm";
//const csv = require('neat-csv')

let table;

describe('Registration Form', () => {
    beforeEach(() => {
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/addUser');
    });
    // before(() => {
    //     cy.fixture("users.csv")
    //         .then(csv)
    //         .then((data) => {
    //             table = data
    //         })
    // })    
    it('Validate Sign Up Form', () => {
        herokuForm.validateSignUpPage();
    });
    
    it('Validate Sign Up Error messages', () => {
        herokuForm.validateSignUpPageErrors();
    });

    it ('Validate contact form', () => {
        // const user = 'Auto_Testing';
        // const pass = 1234;
        herokuForm.signupProcess(user,pass,table);
    });

    it('Validate Cancel button', () => {
        //Click en cancel
        //Validar que estás en login
    });
})

    