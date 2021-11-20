import {before} from 'lodash';
import * as utilities from '../../support/utilities';

const {getByDataCy} = utilities;

// STATIC ELEMENTS
const inputUsername = () => getByDataCy('login-input-email', {count: 1});
const inputPassword = () => getByDataCy('login-input-password', {count: 1});
const linkRegister = () => getByDataCy('login-link-register', {count: 1});
const linkForgot = () => getByDataCy('login-link-forgot', {count: 1});
const navbarButtonLogout = () => getByDataCy('navbar-button-logout').first();

// SPECIAL ELEMENTS
const buttonSubmit = (state: 'not.disabled' | 'disabled') =>
    getByDataCy('login-button-submit', {count: 1}).should(
        state.replace('disabled', 'be.disabled'),
    );
const messagePanelError = (state: 'visible' | 'invisible') =>
    getByDataCy('message-panel-error', {count: state === 'visible' ? 1 : 0});

describe('The Login Page', function () {
    beforeEach(() => {
        cy.fixture('account.json').as('accountJSON');
        cy.visit('/login');
    });

    it('has working links to other auth-pages', function () {
        cy.get('h1').should('have.length', 1).should('have.text', 'Login');

        linkRegister().click();
        cy.url().should('include', '/register');

        cy.visit('/login');
        linkForgot().click();
        cy.url().should('include', '/forgot-password');
    });

    it('has expected inputs/labels and working password-visibility toggle', function () {
        inputUsername().type('abc').should('have.value', 'abc');
        inputUsername().should('have.attr', 'type').and('eq', 'text');

        inputPassword().type('abcde').should('have.value', 'abcde');
        inputPassword().should('have.attr', 'type').and('eq', 'password');

        // TODO: Test that with component testing (password visibility toggle)
        cy.get('svg').should('have.length', 1).click();
        cy.get('input').last().should('have.attr', 'type').and('eq', 'text');
        cy.get('svg').should('have.length', 1).click();
        cy.get('input').last().should('have.attr', 'type').and('eq', 'password');

        buttonSubmit('disabled');
        inputPassword().type('fgh').should('have.value', 'abcdefgh');
        buttonSubmit('not.disabled');
    });

    it('login and logout with blueberry test account works', function () {
        const {USERNAME, PASSWORD} = this.accountJSON;

        // logging in
        inputUsername().type(USERNAME);
        inputPassword().type(PASSWORD);
        buttonSubmit('not.disabled').click();
        cy.url().should('include', '/configurations');

        // refresh the page (test the api-key stored in a cookie)
        cy.visit('/login');
        cy.url().should('include', '/configurations');

        // logging out
        navbarButtonLogout().click({force: true});
        cy.url().should('include', '/login');
        inputUsername().should('have.value', '');
        inputPassword().should('have.value', '');
        buttonSubmit('disabled');
    });

    it('shows message for invalid credentials', function () {
        const {USERNAME, PASSWORD, TMP_PASSWORD} = this.accountJSON;

        // login does not work with invalid password
        inputUsername().type(USERNAME);
        inputPassword().type(TMP_PASSWORD);
        buttonSubmit('not.disabled').click();
        cy.url().should('include', '/login');
        messagePanelError('visible');

        // message should disappear after typing again
        inputPassword().clear().type(PASSWORD);
        messagePanelError('invisible');

        // login should work after an unsuccessful attempt
        buttonSubmit('not.disabled').click();
        cy.url().should('include', '/configurations');
    });
});
