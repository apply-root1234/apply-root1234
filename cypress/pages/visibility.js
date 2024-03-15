class visibility  
{

    elements =
    {
        hideBtn: () => cy.get('#hideButton'),
        removedBtn: () => cy.get('#removedButton'),
        zeroWidthBtn: () => cy.get('#zeroWidthButton'),
        overlappedBtn: () => cy.get('#overlappedButton'),
        transparentBtn: () => cy.get('#transparentButton'),
        invisibleBtn: () => cy.get('#invisibleButton'),
        notDisplayedBtn: () => cy.get('#notdisplayedButton'),
        offscreenBtn: () => cy.get('#offscreenButton')
    }
   
    hideButtons()
    {
        this.elements.hideBtn().click();
    }
    
    checkRemovedBtn()
    {   // Removed button should not exist in the DOM
        this.elements.removedBtn().should('not.exist');
    }

    
    checkZeroWBtn()
    {   //'Zero Width' button should be present but not visible due to width
        this.elements.zeroWidthBtn().invoke('width').should('be.eql', 0);
    }
    
    //Should be validated differently
    checkOverlappedBtn()
    {
        //'Overlapped' button should be present but might be covered by another element
        // Was there something else needed to be added here?
        this.elements.overlappedBtn().should('be.visible');
        //this.elements.overlappedBtn().should('be.below',);
    }
    
    checkOpacityBtn()
    {
        // 'Opacity 0' button should be present but not visible due to opacity
        //Here it was needed to use 'equal' since the opacity value is saved like a string
        this.elements.transparentBtn().invoke('css', 'opacity').should('equal', '0');
    }
    
    checkInvisibleBtn()
    {
        //Visibility Hidden' button should be present in the DOM but not visible
        this.elements.invisibleBtn().should('not.be.visible');
    }

    checkDisplayNoneBtn()
    {
        //'Display None' button should not be visible
        this.elements.notDisplayedBtn().should('not.be.visible');
    }

    //Should be validated differently
    checkOffscreenBtn()
    {
        //'Offscreen' button should be present but located off the visible screen
        this.elements.offscreenBtn().should('be.visible');
    }

}
    
module.exports = new visibility();