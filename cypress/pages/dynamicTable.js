class dynamicTable
{

    elements =
    {
        columnInRowgroup1: () => cy.get('[role="rowgroup"]').first().find('[role="columnheader"]'),
        chromeRow: () =>  cy.get('[role="rowgroup"]').eq(1).find('[role="row"]')
                            .contains('[role="cell"]', 'Chrome').parent().find('[role="cell"]'), 
        //here we're accessing 2nd rowgroup, while being in second rowgroup we're going to iterate
        //through each row to find the cell that contains 'Chrome'. After finding Chrome we step
        //back from that cell element to go to its correspondant X row
        yellowLabel:()=> cy.get('.bg-warning')
    }
    
    compareValue()
    {
        // Step 1: Find the index of the "CPU" column
        let cpuColumnIndex = -1; // initial value for variable cpuColumnIndex
        this.elements.columnInRowgroup1().each(($el, index) => 
        { 
            //Search starts by focusing on the first rowgroup of our table
            //looking at each columnheader. 
            if ($el.text().trim() === 'CPU') 
            {
                //If CPU value was found in columnheader, index is saved and iteration stops
                cpuColumnIndex = index;
                return false; 
            }
        }).then(() => 
        {
            if (cpuColumnIndex === -1) 
            { //If CPU value was not found error is thrown
                throw new Error('CPU column not found');
            }

            // Step 2: Locate the "Chrome" that is in X row and 
            // access the CPU value to compare it to yellow label
            this.elements.chromeRow().eq(cpuColumnIndex).then($cpuCell => 
                {
                    const cpuValue = $cpuCell.text();
                    //obtained value was saved in cpuValue variable
                    cy.log(`CPU value for Chrome: ${cpuValue}`); 
                    //printed to check if was well extracted
                    this.elements.yellowLabel().contains(cpuValue);
                    this.elements.yellowLabel().should('contain.text', cpuValue) //Just another way to validate but the other is also fine
                    //assertion was made according to exercise
                    cy.log(`CPU value for Chrome matches yellow label`); 
                }
            );
        }
        );
    }
    
}
    
module.exports = new dynamicTable();