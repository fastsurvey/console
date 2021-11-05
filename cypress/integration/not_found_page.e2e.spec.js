describe('The Not Found Page', () => {
    it('works as expected', () => {
        cy.visit('/some-unknown-url');
        cy.get('h1')
            .should('have.length', 1)
            .should('have.text', '404: Page not found');
        // TODO: assert(page should have at least one monkey in it)
        cy.get('main')
            .find('button')
            .should('have.length', 1)
            .first()
            .should('have.text', 'Back to Main Page')
            .click();
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
