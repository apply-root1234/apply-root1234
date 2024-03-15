import visibility from "../../pages/visibility";

it('Visibility Testing', () => 
{
    cy.visit('http://uitestingplayground.com/visibility');
    cy.log(`Hide button is now being clicked `);
    visibility.hideButtons();
    cy.log(`Checking visibility of buttons `);
    visibility.checkDisplayNoneBtn();
    visibility.checkInvisibleBtn();
    visibility.checkOffscreenBtn();
    visibility.checkOpacityBtn();
    visibility.checkOverlappedBtn();
    visibility.checkRemovedBtn();
    visibility.checkZeroWBtn();
});
