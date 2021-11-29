import * as utilities from '../../support/utilities';

const {getCySelector} = utilities;
const get = getCySelector;

const inputEmail = () => get(['register-panel', 'input-email'], {count: 1});
const inputUsername = () => get(['register-panel', 'input-username'], {count: 1});
const inputPassword = () => get(['register-panel', 'input-password'], {count: 1});

describe('The Register Page', () => {
    it('has working links to other auth-pages', () => {
        cy.visit('/register');
        cy.get('h1').should('have.length', 1).should('have.text', 'Register');
        cy.get('a')
            .contains('Already have an account?')
            .should('have.length', 1)
            .click();
        cy.url().should('include', '/login');
    });
});
