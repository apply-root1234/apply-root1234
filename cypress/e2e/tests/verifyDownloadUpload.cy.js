import downloadUpload from "../../pages/downloadUpload";

it('Downloading and Uploading Testing', () => 
{
  cy.visit('https://demoqa.com/upload-download');
  downloadUpload.checkDownBtn();
  downloadUpload.checkUpFile();
  /*
  cy.on('uncaught:exception', (err, runnable) =>
  {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  */
});