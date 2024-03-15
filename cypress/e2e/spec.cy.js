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

https://www.browserstack.com/guide/cypress-page-object-model
 */


describe('url 1', () => {
  it.only('Type Text and Submit Button', () => 
  {
    cy.visit('http://uitestingplayground.com/textinput');
    cy.get('#newButtonName').type('QAisFUN')
    cy.get('#updatingButton').click()
  });
});


describe('url 2', () => 
{
  
  it.only('Stop when 75% is reached', () => {
    cy.visit('http://uitestingplayground.com/progressbar');
    cy.get('#startButton').click();

      function StopWhen75() 
      {
        cy.get('#progressBar').invoke('attr', 'aria-valuenow').then((valNow) => 
        {
          /* This line uses Cypress to locate an HTML element with the ID progressBar.
            It then uses the invoke() command to retrieve the value of the attribute aria-valuenow of that element.
            The then() function takes a callback function (valNow) => {...}. 
            This callback will be executed once the previous command has finished and 
            will receive the value of aria-valuenow as valNow.
           */
          const progress = parseInt(valNow, 10); 
          /*
            This line converts the retrieved value of aria-valuenow (valNow) to an integer using parseInt() 
            function and stores it in a variable named progress. The second argument 10 is the radix or base, 
            specifying that the number is in base-10 (decimal).
          */
          if (progress < 75) {
            // If progress is less than 75, it wait a bit and then check again
            cy.wait(100); // Wait for 100 miliseconds before checking again
            StopWhen75(); // Recursively call the function until the condition is met
          } else {
            // Once progress reaches 75%, click the stop button
            cy.get('#stopButton').click();
          }
          });        
      };
      // Start the recursive function to monitor progress and stop at the right time
      StopWhen75();
    
  });
});


describe('Table Test', () => 
{
  it('Finds the CPU value for Chrome', () => 
  {
    cy.visit('http://uitestingplayground.com/dynamictable');
    // Step 1: Find the index of the "CPU" column
    let cpuColumnIndex = -1; // initial value for variable cpuColumnIndex
    cy.get('[role="rowgroup"]')
      .first().find('[role="columnheader"]')
      .each(($el, index) => 
      { 
        //Search starts by focusing on the first rowgroup of our table
        //looking at each columnheader. 
        if ($el.text().trim() === 'CPU') 
        { 
          //If CPU value was found in columnheader, 
          //index is saved and iteration stops
          cpuColumnIndex = index;
          return false; 
        }
      }).then(() => 
      {
        if (cpuColumnIndex === -1) 
        { //If CPU value was not found error is thrown
          throw new Error('CPU column not found');
        }

        // Step 2: Locate the "Chrome" row and access the CPU value
        cy.get('[role="rowgroup"]').eq(1) 
          //here we're accessing 2nd rowgroup
          .find('[role="row"]').contains('[role="cell"]', 'Chrome')
          //while being in second rowgroup we're going to iterate
          //through each row to find the cell that contains 'Chrome' 
          .parent().find('[role="cell"]')
          //after finding Chrome we step back from that cell element 
          //to go to its correspondant X row
          .eq(cpuColumnIndex)
          //after getting this Xrow we're going to the cell element that 
          //contains the CPU column corresponding to Chrome %
          .then($cpuCell => 
            {
              const cpuValue = $cpuCell.text();
              //obtained value was saved in cpuValue variable
              cy.log(`CPU value for Chrome: ${cpuValue}`); 
              //printed to check if was well extracted
              cy.get('.bg-warning').contains(cpuValue);
              //assertion was made according to exercise
            }
          );
      }
    );
  });
});


describe('url 4', () => 
{
  //Goal of exercise
  //1. Learn locators of all buttons
  //2. In your testing scenario press Hide button
  //3. Determine if other buttons visible or not

  /*
    Reminder!!! 
    In Cypress, .should('be.visible') checks if an element is in the DOM 
    and not hidden (display: none or visibility: hidden). 
    However, elements with zero width, zero opacity or positioned offscreen 
    are considered "visible" by this definition. 
  */

  it('Visibility Testing', () => 
  {
    cy.visit('http://uitestingplayground.com/visibility');
    
    cy.log(`Hide button is now being clicked `);
    cy.get('#hideButton').click();

    cy.log(`Checking visibility of buttons `);

    // Removed button should not exist in the DOM
    cy.get('#removedButton').should('not.exist');

    // 'Zero Width' button should be present but not visible due to width
    cy.get('#zeroWidthButton').invoke('width').should('be.eql', 0);
    
    //'Overlapped' button should be present but might be covered by another element
    // Was there something else needed to be added here?
    cy.get('#overlappedButton').should('be.visible');

    // 'Opacity 0' button should be present but not visible due to opacity
    //Here it was needed to use 'equal' since the opacity value is saved like a string
    cy.get('#transparentButton').invoke('css', 'opacity').should('equal', '0');

    //Visibility Hidden' button should be present in the DOM but not visible
    cy.get('#invisibleButton').should('not.be.visible');

    // 'Display None' button should not be visible
    cy.get('#notdisplayedButton').should('not.be.visible');

    //'Offscreen' button should be present but located off the visible screen
    cy.get('#offscreenButton').should('be.visible');
    
  });
});


describe('url 5', () => 
{
  it('Downloading and Uploading Testing', () => 
  {
    cy.visit('https://demoqa.com/upload-download');
    cy.get('#downloadButton').should('exist');
    cy.get('#downloadButton').should('be.visible');
    cy.get('#downloadButton').should('not.be.disabled');
    cy.get('#downloadButton').click();
    cy.get('#uploadFile').should('exist');
    cy.get('#uploadFile').should('be.visible');
    cy.get('#uploadFile').should('not.be.disabled');
    const filePath = 'sampleFile.jpg';
    cy.get('#uploadFile').attachFile(filePath);
  });
});
