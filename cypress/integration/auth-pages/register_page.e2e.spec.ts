import * as utilities from '../../support/utilities';

const {getCySelector, assertDataCy} = utilities;
const get = getCySelector;

const inputEmail = () => get(['register-panel', 'input-email'], {count: 1});
const inputUsername = () => get(['register-panel', 'input-username'], {count: 1});
const inputPassword = () => get(['register-panel', 'input-password'], {count: 1});
const buttonSubmit = () => get(['register-panel', 'button-submit'], {count: 1});
const linkToLogin = () => get(['register-panel', 'link-to-login'], {count: 1});
const validation = () => get(['register-panel', 'validation-bar'], {count: 1});

describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
        cy.url().should('eq', 'http://localhost:3000/register');
    });

    it('initial state', () => {
        inputEmail().should('be.empty');
        inputUsername().should('be.empty');
        inputPassword().should('be.empty');
        buttonSubmit();
        assertDataCy(validation(), 'isinvalid');

        linkToLogin().click();
        cy.url().should('include', '/login');
    });
});
