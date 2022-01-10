import {repeat} from 'lodash';
import {getCySelector} from '../../support/utilities';
const get = getCySelector;

const title = () => get(['verify-email-panel', 'title'], {count: 1});
const buttonSubmit = () => get(['verify-email-panel', 'button-submit']);
const paragraphNoToken = () => get(['verify-email-panel', 'paragraph-no-token']);
const linkToLogin = () => get(['verify-email-panel', 'link-to-login']);
const errorMessage = () => get(['message-panel-error']);
const successMessage = () => get(['message-panel-success']);

describe('Verify Email Page', () => {
    it('without token', () => {
        cy.visit('/verify');
        title().should('have.text', 'Verify your Email');
        buttonSubmit().should('have.length', 0);
        paragraphNoToken().should('have.length', 1);
        linkToLogin().should('have.length', 1);

        linkToLogin().click();
        cy.url().should('include', '/login');
    });

    it('with invalid token', () => {
        cy.visit(`/verify?token=${repeat('abcdabcd', 8)}`);
        title().should('have.text', 'Verify your Email');
        buttonSubmit().should('have.length', 1).should('not.be.disabled');
        paragraphNoToken().should('have.length', 0);
        linkToLogin().should('have.length', 0);

        cy.intercept('POST', '/verification', (req) => {
            expect(req.body).to.deep.equal({
                verification_token: repeat('abcd', 16),
            });
            req.reply({statusCode: 401});
        });

        errorMessage().should('have.length', 0);
        successMessage().should('have.length', 0);
        buttonSubmit().click();

        errorMessage()
            .should('have.length', 1)
            .find('[data-cy="message"]')
            .should('have.text', 'Invalid verification link');
        title().should('have.text', 'Verify your Email');
        cy.url({timeout: 10000}).should(
            'contain',
            `/verify?token=${repeat('abcd', 16)}`,
        );
    });

    it('with (already) valid token', () => {
        // code 200 if new and valid
        // code 400 if valid but already verified
        [200, 400].forEach((statusCode) => {
            cy.visit(`/verify?token=${repeat('abcdabcd', 8)}`);
            cy.intercept('POST', '/verification', (req) => {
                expect(req.body).to.deep.equal({
                    verification_token: repeat('abcd', 16),
                });
                req.reply({statusCode});
            });

            errorMessage().should('have.length', 0);
            successMessage().should('have.length', 0);
            buttonSubmit().click();

            successMessage()
                .should('have.length', 1)
                .find('[data-cy="message"]')
                .should('contain.text', 'Success! Redirect');
            title().should('have.text', 'Success!');
            cy.url({timeout: 10000}).should('contain', '/login');
        });
    });
});
