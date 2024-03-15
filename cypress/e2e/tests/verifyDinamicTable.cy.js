import dynamicTable from "../../pages/dynamicTable";

it('Finds and compare CPU value for Chrome with Yellow Label', () => 
{
    cy.visit('http://uitestingplayground.com/dynamictable');
    dynamicTable.compareValue();
    
});