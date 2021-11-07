describe('The Forgot Password Page', () => {
    it('has working links to other auth-pages', () => {
        cy.visit('/forgot-password');
        cy.get('h1')
            .should('have.length', 1)
            .should('have.text', 'Forgot your password?');
        cy.get('a')
            .contains('support@fastsurvey.de')
            .should('have.length', 1)
            .should('have.attr', 'href')
            .and('eq', 'mailto:support@fastsurvey.de');
        cy.get('a')
            .contains('Go back to login')
            .should('have.length', 1)
            .click();
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
