import downloadUpload from "../../pages/downloadUpload";

it('Downloading and Uploading Testing', () => 
{
  cy.visit('https://demoqa.com/upload-download');
  downloadUpload.checkDownBtn();
  downloadUpload.checkUpFile();
});