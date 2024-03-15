class downloadUpload  
{

    elements =
    {
        downloadBtn: () => cy.get('#downloadButton'),
        upFile: () => cy.get('uploadFile')
    }

    checkDownBtn()
    {
        this.elements.downloadBtn().should('exist');
        this.elements.downloadBtn().should('be.visible');
        this.elements.downloadBtn().should('not.be.disabled');
        this.elements.downloadBtn().click();
    }

    checkUpFile()
    {
        this.elements.upFile().should('exist');
        this.elements.upFile().should('be.visible');
        this.elements.upFile().should('not.be.disabled');
        const filePath = 'sampleFile.jpg';
        this.elements.upFile().attachFile(filePath);
    }

}

module.exports = new downloadUpload();