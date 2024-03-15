import textinput from "../../pages/textinput";

it('Type Text and Submit Button', () => 
{
    cy.visit('http://uitestingplayground.com/textinput');
    textinput.changeButton();
    textinput.updateButton();
});
