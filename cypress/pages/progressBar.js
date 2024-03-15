class progressBar
{
    elements =
    {
        startButton: () => cy.get('#startButton'),
        progressCurrentVal: () => cy.get('#progressBar').invoke('attr', 'aria-valuenow'),
        stopButton: () => cy.get('#stopButton')
    }
    
    startProcess()
    {
        this.elements.startButton().click();
    }

    stop75()
    {
        this.elements.progressCurrentVal().then((valNow) => 
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
            this.stop75(); // Recursively call the function until the condition is met
            //To maintain the context and correctly reference the method 
            //within the same object or class here method has to be 
            //pointed as this.stop75() instead of stop75()
          } else {
            // Once progress reaches 75%, click the stop button
            this.elements.stopButton().click();
          }
          });        
      };
    
}
    
module.exports = new progressBar();