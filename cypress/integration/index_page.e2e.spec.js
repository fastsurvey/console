describe('The Landing Page', () => {
    it('redirect to login works', () => {
        cy.visit('/');
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
