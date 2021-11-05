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

    it('has expected inputs/labels and working password-visibility toggle', () => {
        cy.visit('/login');
        cy.get('input').should('have.length', 2);
        cy.get('label').should('have.length', 2);
        cy.get('input').first().type('abc').should('have.value', 'abc');
        cy.get('input').last().type('abcde').should('have.value', 'abcde');

        cy.get('input').first().should('have.attr', 'type').and('eq', 'text');
        cy.get('input')
            .last()
            .should('have.attr', 'type')
            .and('eq', 'password');
        cy.get('svg').should('have.length', 1).click();
        cy.get('input').last().should('have.attr', 'type').and('eq', 'text');
        cy.get('svg').should('have.length', 1).click();
        cy.get('input')
            .last()
            .should('have.attr', 'type')
            .and('eq', 'password');

        cy.get('button')
            .contains('Login')
            .should('have.length', 1)
            .parents('button')
            .should('be.disabled');

        cy.get('input').last().type('fgh').should('have.value', 'abcdefgh');

        cy.get('button')
            .contains('Login')
            .parents('button')
            .should('not.be.disabled');
    });

    it('login and logout with blueberry test account works', () => {
        cy.visit('/login');
        cy.get('input').should('have.length', 2);
        cy.get('input').first().type('blueberry');
        cy.get('input').last().type('12345678');

        cy.get('button')
            .contains('Login')
            .parents('button')
            .should('not.be.disabled')
            .click();

        cy.url().should('eq', 'http://localhost:3000/configurations');

        cy.get('button')
            .contains('Logout')
            .should('have.length', 1)
            .parents('button')
            .should('not.be.disabled')
            .click({force: true});

        cy.url().should('eq', 'http://localhost:3000/login');
        cy.get('input').should('have.length', 2);
        cy.get('input').first().should('have.value', '');
        cy.get('input').last().should('have.value', '');
        cy.get('button')
            .contains('Login')
            .parents('button')
            .should('be.disabled');
    });

    it('shows message for invalid credentials', () => {
        cy.visit('/login');
        cy.get('input').should('have.length', 2);
        cy.get('input').first().type('blueberry');
        cy.get('input').last().type('123456789');

        cy.get('button')
            .contains('Login')
            .parents('button')
            .should('not.be.disabled')
            .click();

        cy.url().should('eq', 'http://localhost:3000/login');

        // message colors will be tested in a component test
        cy.get('div').contains('Invalid credentials').should('have.length', 1);

        // message should disappear after typing again
        cy.get('input').last().clear().type('12345678');
        cy.get('div').contains('Invalid credentials').should('have.length', 0);

        // login should work after an unsuccessful attempt
        cy.get('button')
            .contains('Login')
            .parents('button')
            .should('not.be.disabled')
            .click();

        cy.url().should('eq', 'http://localhost:3000/configurations');
    });
});
