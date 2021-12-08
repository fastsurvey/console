import {repeat} from 'lodash';
import * as utilities from '../../support/utilities';

const {getCySelector, assertDataCy} = utilities;
const get = getCySelector;

const inputEmail = () => get(['register-panel', 'input-email'], {count: 1});
const inputUsername = () => get(['register-panel', 'input-username'], {count: 1});
const inputPassword = () => get(['register-panel', 'input-password'], {count: 1});
const buttonSubmit = () => get(['register-panel', 'button-submit'], {count: 1});
const linkToLogin = () => get(['register-panel', 'link-to-login'], {count: 1});
const validation = () =>
    get(['register-panel', 'validation-bar'], {count: 1, invisible: true});
const errorMessage = () => get(['message-panel-error']);

describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register');
        cy.url().should('contain', '/register');
        cy.fixture('account.json').as('accountJSON');
    });

    const assertValidation = (valid: boolean, message?: string) => {
        assertDataCy(validation(), valid ? 'isvalid' : 'isinvalid');
        if (!valid) {
            validation().find('[data-cy="message"]').should('contain.text', message);
            buttonSubmit().should('be.disabled');
        } else {
            buttonSubmit().should('not.be.disabled');
        }
    };

    it('initial state', () => {
        inputEmail().should('be.empty');
        inputUsername().should('be.empty');
        inputPassword().should('be.empty');
        buttonSubmit();
        assertValidation(false, 'email');

        linkToLogin().click();
        cy.url().should('include', '/login');
    });

    it('form validation, register process', function () {
        const {EMAIL, USERNAME, PASSWORD} = this.accountJSON;

        inputEmail().type('somesomeomeo');
        assertValidation(false, 'email invalid');
        inputEmail().clear().type(EMAIL);
        assertValidation(false, 'username too short');

        inputUsername().type(repeat('x', 1));
        assertValidation(false, 'password too short');
        inputUsername().type(repeat('x', 31));
        assertValidation(false, 'password too short');
        inputUsername().type('x');
        assertValidation(false, 'username too long');
        inputUsername().clear().type(USERNAME);
        assertValidation(false, 'password too short');

        inputPassword().type('1234567');
        assertValidation(false, 'password too short');
        inputPassword().clear().type(PASSWORD);
        assertValidation(true);

        cy.intercept('POST', '/users', (req) => {
            expect(req.body).to.deep.equal({
                email_address: EMAIL,
                username: USERNAME,
                password: PASSWORD,
            });
            req.reply({statusCode: 400});
        });

        errorMessage().should('have.length', 0);
        buttonSubmit().click();
        errorMessage()
            .should('have.length', 1)
            .find('[data-cy="message"]')
            .should('have.text', 'Email is already taken');
    });
});
