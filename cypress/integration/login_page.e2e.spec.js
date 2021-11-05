describe('The Login Page', () => {
    it('has working links to other auth-pages', () => {
        cy.visit('/login');
        cy.get('h1').should('have.length', 1).should('have.text', 'Login');
        cy.get('a')
            .contains("Don't have an account yet?")
            .should('have.length', 1)
            .click();
        cy.url().should('eq', 'http://localhost:3000/register');
        cy.visit('/login');
        cy.get('a')
            .contains('Forgot your password?')
            .should('have.length', 1)
            .click();
        cy.url().should('eq', 'http://localhost:3000/forgot-password');
    });
});
