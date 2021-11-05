describe('The Not Found Page', () => {
    it('works as expected', () => {
        cy.visit('/some-unknown-url');
        cy.get('h1').should('have.text', '404: Page not found');
        // TODO: assert(page should have at least one monkey in it)
        cy.get('main').find('button').should('have.length', 1);
        cy.get('main')
            .find('button')
            .first()
            .should('have.text', 'Back to Landing Page')
            .click();
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
