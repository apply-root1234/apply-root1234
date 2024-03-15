class textinput
{

    elements =
    {
        newButtonName: () => cy.get('#newButtonName'),
        updatingButton: () => cy.get('#updatingButton')
    }
    
    changeButton(text)
    {
        this.elements.newButtonName().type(text);
    }

    updateButton(expectedValue)
    {  
        this.elements.updatingButton().click();
        //this.elements.updatingButton().contains(expectedValue)
        this.elements.updatingButton().should('contain.text', expectedValue)
    }
    
    
}
    
module.exports = new textinput();