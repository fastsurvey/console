describe('The Index Page', () => {
    it('redirect correctly to login', () => {
        cy.visit('/');
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
