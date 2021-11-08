describe('The Index Page', () => {
    it('redirect correctly to login', () => {
        cy.visit('/');
        cy.url().should('include', '/login');
    });
});
