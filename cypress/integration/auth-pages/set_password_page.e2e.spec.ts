import {getCySelector, assertDataCy} from '../../support/utilities';
const get = getCySelector;

const EMAIL_TOKEN = 'some-email-token';
const ACCESS_TOKEN = 'some-access-token';
const EMAIL_ADDRESS = 'some-email-address';
const USERNAME = 'some-username';
const PASSWORD = 'some-password';

const panel = () => get(['set-password-panel'], {count: 1});
const inputPassword = () => get(['set-password-panel', 'input-password'], {count: 1});
const buttonSubmit = () => get(['set-password-panel', 'button-submit'], {count: 1});
const linkToLogin = () => get(['set-password-panel', 'link-to-login'], {count: 1});
const linkToRequestPassword = () =>
    get(['set-password-panel', 'link-to-request-password'], {count: 1});
const linkToSurveys = () => get(['set-password-panel', 'link-to-surveys'], {count: 1});

function assertState(
    state:
        | 'no-token'
        | 'pending'
        | 'submitting'
        | 'success'
        | 'invalid-token'
        | 'server-error',
) {
    assertDataCy(panel(), `state-${state}`);
}

describe('The Set Password Page', () => {
    it('works with no token', () => {
        cy.visit('/set-password');
        cy.url().should('contain', '/set-password');
        assertState('no-token');
        linkToLogin().click();
        cy.url().should('contain', '/login');
    });

    it('works for 401s', () => {
        cy.visit(`/set-password?token=${EMAIL_TOKEN}`);
        cy.url().should('contain', `/set-password?token=${EMAIL_TOKEN}`);

        inputPassword().type(PASSWORD).should('have.value', PASSWORD);
        cy.intercept('PUT', '/authentication', (req) => {
            expect(req.body).to.deep.equal({
                verification_token: EMAIL_TOKEN,
            });
            req.reply({statusCode: 401});
        });
        buttonSubmit().click();
        assertState('invalid-token');

        linkToRequestPassword().click();
        cy.url().should('contain', '/request-password');
    });

    it('works for 500s', () => {
        cy.visit(`/set-password?token=${EMAIL_TOKEN}`);
        cy.url().should('contain', `/set-password?token=${EMAIL_TOKEN}`);

        inputPassword().type(PASSWORD).should('have.value', PASSWORD);
        cy.intercept('PUT', '/authentication', (req) => {
            expect(req.body).to.deep.equal({
                verification_token: EMAIL_TOKEN,
            });
            req.reply({statusCode: 500});
        });
        buttonSubmit().click();
        assertState('server-error');
    });

    it('works for 200s', () => {
        cy.visit(`/set-password?token=${EMAIL_TOKEN}`);
        cy.url().should('contain', `/set-password?token=${EMAIL_TOKEN}`);
        assertState('pending');
        inputPassword().type(PASSWORD).should('have.value', PASSWORD);

        cy.intercept('PUT', '/authentication', (req) => {
            expect(req.body).to.deep.equal({
                verification_token: EMAIL_TOKEN,
            });
            req.reply({
                statusCode: 200,
                body: {username: USERNAME, access_token: ACCESS_TOKEN},
            });
        });
        cy.intercept('PUT', `/users/${USERNAME}`, (req) => {
            expect(req.body).to.deep.equal({
                username: USERNAME,
                email_address: EMAIL_ADDRESS,
                password: PASSWORD,
            });
            req.reply({
                statusCode: 200,
            });
        });
        cy.intercept('GET', `/users/${USERNAME}`, (req) => {
            req.reply({
                statusCode: 200,
                body: {email_address: EMAIL_ADDRESS, verified: true},
            });
        });
        cy.intercept('GET', `/users/${USERNAME}/surveys`, (req) => {
            req.reply({
                statusCode: 200,
                body: [],
            });
        });
        buttonSubmit().click();
        assertState('submitting');
        assertState('success');

        linkToSurveys().click();
        cy.url().should('contain', '/surveys');
    });
});
