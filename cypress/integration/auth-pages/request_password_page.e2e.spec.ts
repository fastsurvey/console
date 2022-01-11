import {getCySelector, assertDataCy} from '../../support/utilities';
const get = getCySelector;

const IDENTIFIER = 'some-username';

const panel = () => get(['request-password-panel'], {count: 1});
const inputIdentifier = () =>
    get(['request-password-panel', 'input-identifier'], {count: 1});
const buttonSubmit = () => get(['request-password-panel', 'button-submit'], {count: 1});
const buttonTypo = () => get(['request-password-panel', 'button-typo'], {count: 1});
const linkToLogin = () => get(['request-password-panel', 'link-to-login'], {count: 1});
const errorMessage = () => get(['message-panel-error']);

describe('The Request Password Page', () => {
    beforeEach(() => {
        cy.visit('/request-password');
        cy.url().should('contain', '/request-password');
    });

    it('looks as expected', () => {
        assertDataCy(panel(), 'state-pending');
        inputIdentifier().should('have.value', '');
        buttonSubmit().should('be.disabled');
        linkToLogin().click();
        cy.url().should('include', '/login');
    });

    it('works for 500s', () => {
        inputIdentifier().type(IDENTIFIER).should('have.value', IDENTIFIER);
        buttonSubmit().should('not.be.disabled');
        cy.intercept('POST', '/authentication', (req) => {
            expect(req.body).to.deep.equal({
                identifier: IDENTIFIER,
            });
            req.reply({statusCode: 500});
        });
        buttonSubmit().click();
        assertDataCy(panel(), 'state-failed');
    });

    it('works for 401s', () => {
        inputIdentifier().type(IDENTIFIER).should('have.value', IDENTIFIER);
        cy.intercept('POST', '/authentication', (req) => req.reply({statusCode: 401}));
        buttonSubmit().click();
        assertDataCy(panel(), 'state-pending');
        assertDataCy(errorMessage(), 'error-login-credentials');
        inputIdentifier().should('have.value', IDENTIFIER);
    });

    it('works for 404s', () => {
        inputIdentifier().type(IDENTIFIER).should('have.value', IDENTIFIER);
        cy.intercept('POST', '/authentication', (req) => req.reply({statusCode: 404}));
        buttonSubmit().click();
        assertDataCy(panel(), 'state-pending');
        assertDataCy(errorMessage(), 'error-login-credentials');
        inputIdentifier().should('have.value', IDENTIFIER);
    });

    it('works for 200s', () => {
        inputIdentifier().type(IDENTIFIER).should('have.value', IDENTIFIER);
        cy.intercept('POST', '/authentication', (req) => req.reply({statusCode: 200}));
        buttonSubmit().click();
        assertDataCy(panel(), 'state-success');

        buttonTypo().click();
        assertDataCy(panel(), 'state-pending');
        inputIdentifier().should('have.value', IDENTIFIER);
        buttonSubmit().should('not.be.disabled');
    });
});
