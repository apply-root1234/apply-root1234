/* Source: https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test

** Write a real test **
A solid test generally covers 3 phases:

1. Set up the application state.
2. Take an action.
3. Make an assertion about the resulting application state.

You might also see this phrased as 
"Given, When, Then", or "Arrange, Act, Assert". 
But the idea is: First you put the application into a specific state, 
then you take some action in the application that causes it to change, 
and finally you check the resulting application state.
*/

//QA Automation Bootcamp - Week 1
//Ruth Recalde
//March 10th, 2024
/*
  Using POM, create testcase to complie with exercises in following urls:
- http://uitestingplayground.com/textinput
- http://uitestingplayground.com/progressbar 
- http://uitestingplayground.com/dynamictable
- http://uitestingplayground.com/visibility
- https://demoqa.com/upload-download   
 */


describe('url 1', () => {
  
  it('Type Text and Submit Button', () => {
    Cypress.config('baseUrl', 'http://uitestingplayground.com/textinput');
    cy.visit('/');
    cy.get('section').within(() => {
      cy.get('div')
        .get('form')
        .get('div').should('have.class','form-group')
        .get('input').should('have.class','form-control').type('QAisFUN')
        //1. How can I do this using contains as well?
        //Thinking in case there are more than one input element
        //2. What is the difference between should and contains?
        //3. What's the better approach to do this exercise?

      cy.get('div')
        .get('form')
        .get('div').should('have.class','form-group')
        .get('button').should('have.id','updatingButton').click()
      });
      });
})


describe('url 2', () => 
{
  
  it('Stop when 75% is reached', () => {
    Cypress.config('baseUrl', 'http://uitestingplayground.com/progressbar');
    cy.visit('/');
    cy.get('section').within(() => 
    {
      cy.get('#startButton').click();

      function StopWhen75() 
      {
        cy.get('div').should('have.class','container')
        .get('div').should('have.class','progress')
        .get('div').should('have.class','progress-bar bg-info')
        .invoke('attr', 'aria-valuenow')
        .then((valNow) => {
        const progress = parseInt(valNow, 10);
        if (progress < 75) {
        // If progress is less than 75, wait a bit and then check again
        cy.wait(10000); // Wait for 1 second before checking again
        StopWhen75(); // Recursively call the function until the condition is met
        } else {
        // Once progress reaches 75%, click the stop button
         cy.get('#stopButton').click();
        }
        });        
      };
      // Start the recursive function to monitor progress and stop at the right time
      StopWhen75();
    })
  });
      
      //Notes
      //I found "first" and "last" options but I'm not sure if
      //that's the best way to select these buttons
      //since I haven't use "contains" or something less
      //general than get and should have
        
      /*cy.get('div').should('have.class','container')
        .get('button').first().should('have.id','startButton').click();*/
      
      //Also, isn't cy.get('#stopButton') too general?

      /*cy.wait(3000).then(()=>{
        cy.get('#stopButton').click();
      });*/
});
  
describe('url 3', () => 
{
  it('Compare yellow value with cell value', () => {
    cy.visit('http://uitestingplayground.com/dynamictable');
    
    //cy.get('[role="rowgroup"]').get('[role="row"]').contains('Chrome');
    
    cy.get('[role="rowgroup"]').first().within(() => {
      cy.get('[role="row"]')
        .get('[role="columnheader"]').each(($col, colIndex) => {
        if ($col.text().includes('CPU')) {
          const colNumber = colIndex;
          cy.log(`CPU is found on column index: ${colNumber}`);

        }
      });
    });

    cy.get('section').within(() => 
    { 
      //when is necessary to use within and when not?
      cy.get('div').should('have.class','container')
        .get('[role="table"]').get('[role="rowgroup"]')
        .get('[role="row"]').contains('Chrome')
    });

    /*
    //how to clear rowIndex value to zero until it gets to
    //correspondant row that contains Chrome
    cy.get('[role="rowgroup"]').last().within(() => {
      cy.get('[role="row"]')
        .get('[role="cell"]').each(($col, rowIndex) => {
        if ($col.text().includes('Chrome')) {
          const rowNumber = rowIndex;
          cy.log(`Chrome is found on row index: ${rowNumber}`);

        }
      });
    });
    */
  });


});
