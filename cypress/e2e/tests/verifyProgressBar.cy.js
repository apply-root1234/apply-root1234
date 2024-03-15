import progressBar from "../../pages/progressBar";

it ('Stop when 75% is reached', () => 
{
    cy.visit('http://uitestingplayground.com/progressbar');
    progressBar.startProcess();
    progressBar.stop75();
});
