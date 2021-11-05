describe('The Register Page', () => {
    it('has working links to other auth-pages', () => {
        cy.visit('/register');
        cy.get('h1').should('have.length', 1).should('have.text', 'Register');
        cy.get('a')
            .contains('Already have an account?')
            .should('have.length', 1)
            .click();
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
