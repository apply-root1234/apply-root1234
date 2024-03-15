class textinput
{

    elements =
    {
        newButtonName: () => cy.get('#newButtonName'),
        updatingButton: () => cy.get('#updatingButton')
    }
    
    changeButton()
    {
        this.elements.newButtonName().type('QA is FUN');
    }

    updateButton()
    {  
        this.elements.updatingButton().click(); 
    }
    
    
}
    
module.exports = new textinput();