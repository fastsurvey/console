import {getCySelector, logout} from '../../support/utilities';

const get = (selectors: string[]) =>
    getCySelector(['login-panel', ...selectors], {count: 1});

// TODO: refactor getters

const elements = {
    identifier: () => get(['input-identifier']),
    password: () => get(['input-password']),
    submit: () => get(['button-submit']),
    linkToRegister: () => get(['link-to-register']),
    linkToForgot: () => get(['link-to-forgot']),
    errorMessage: () => getCySelector(['message-panel-error']),
};

// SPECIAL ELEMENTS
const assertSubmitState = (submitIsPossible: boolean) =>
    elements.submit().should((submitIsPossible ? 'not.' : '') + 'be.disabled');

const assertMessageState = (messageIsVisible: boolean) =>
    elements.errorMessage().should('have.length', messageIsVisible ? 1 : 0);

describe('The Login Page', function () {
    beforeEach(() => {
        cy.fixture('account.json').as('accountJSON');
        cy.visit('/login');
    });

    it('has working links to other auth-pages', function () {
        cy.get('h1').should('have.length', 1).should('have.text', 'Login');

        elements.linkToRegister().click();
        cy.url().should('include', '/register');

        cy.visit('/login');
        elements.linkToForgot().click();
        cy.url().should('include', '/forgot-password');
    });

    it('has expected inputs/labels and working password-visibility toggle', function () {
        elements.identifier().type('abc').should('have.value', 'abc');
        elements.identifier().should('have.attr', 'type').and('eq', 'text');

        elements.password().type('abcde').should('have.value', 'abcde');
        elements.password().should('have.attr', 'type').and('eq', 'password');

        // TODO: Test that with component testing (password visibility toggle)
        cy.get('svg').should('have.length', 1).click();
        cy.get('input').last().should('have.attr', 'type').and('eq', 'text');
        cy.get('svg').should('have.length', 1).click();
        cy.get('input').last().should('have.attr', 'type').and('eq', 'password');

        assertSubmitState(false);
        elements.password().type('fgh').should('have.value', 'abcdefgh');
        assertSubmitState(true);
    });

    it('login and logout with blueberry test account works', function () {
        const {EMAIL, USERNAME, PASSWORD} = this.accountJSON;

        // logging in with username
        elements.identifier().type(USERNAME);
        elements.password().type(PASSWORD);
        elements.submit().click();
        cy.url().should('include', '/surveys');

        // refresh the page (test the api-key stored in a cookie)
        cy.visit('/login');
        cy.url().should('include', '/surveys');

        // logging out
        logout();
        cy.url().should('include', '/login');
        elements.identifier().should('have.value', '');
        elements.password().should('have.value', '');
        assertSubmitState(false);

        // logging in with email
        cy.reload();
        elements.identifier().type(EMAIL);
        elements.password().type(PASSWORD);
        elements.submit().click();
        cy.url().should('include', '/surveys');

        // refresh the page (test the api-key stored in a cookie)
        cy.visit('/login');
        cy.url().should('include', '/surveys');

        // logging out
        logout();
        cy.url().should('include', '/login');
        elements.identifier().should('have.value', '');
        elements.password().should('have.value', '');
        assertSubmitState(false);
    });

    it('shows message for invalid credentials', function () {
        const {USERNAME, PASSWORD, TMP_PASSWORD} = this.accountJSON;

        // login does not work with invalid password
        elements.identifier().type(USERNAME);
        elements.password().type(TMP_PASSWORD);
        elements.submit().click();
        cy.url().should('include', '/login');
        assertMessageState(true);

        // message should disappear after typing again
        elements.password().clear().type(PASSWORD);
        assertMessageState(false);

        // login should work after an unsuccessful attempt
        elements.submit().click();
        cy.url().should('include', '/surveys');
    });
});
