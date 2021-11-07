describe('The Account Page', () => {
    it('account page looks as expected and the navigation works', () => {
        cy.visit('/login');
        cy.get('input').first().type('blueberry');
        cy.get('input').last().type('12345678');
        cy.get('button').contains('Login').click();
        cy.url().should('eq', 'http://localhost:3000/configurations');

        cy.get('button')
            .contains('Account')
            .should('have.length', 1)
            .parents('button')
            .should('not.be.disabled')
            .click({force: true});

        cy.url().should('eq', 'http://localhost:3000/account');

        cy.get('h1').contains('Modify your Account').should('have.length', 1);

        cy.get('h2').should('have.length', 3);
        cy.get('h2').contains('Account Settings').should('have.length', 1);
        cy.get('h2')
            .contains('Delete your account forever')
            .should('have.length', 1);
        cy.get('h2').contains('Payment Information').should('have.length', 1);
    });
});
