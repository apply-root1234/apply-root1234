import textinput from "../../pages/textinput";

it('Type Text and Submit Button', () => 
{
    cy.visit('http://uitestingplayground.com/textinput');
    const text = 'Automation Review 1'
    textinput.changeButton(text);
    textinput.updateButton(text);
    //Add validation that the button text got updated
    //Other changes in this branch are suggestion of implementation for this
});
