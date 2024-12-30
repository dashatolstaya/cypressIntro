describe('Verify header and footer buttons ', () => {

    it('Finding all buttons in the header', () => {
        cy.get('header button').each((button, index) => {
            cy.wrap(button).should('be.visible');
        });
    });

    it('Finding all links in the footer', () => {
        cy.scrollTo('bottom');
        cy.get('footer a').each((link, index) => {
            cy.wrap(link).should('be.visible');
        });
    })
})