import {repeat} from 'lodash';
import * as utilities from '../../support/utilities';

const {getCySelector} = utilities;
const get = getCySelector;

const title = () => get(['verify-email-panel', 'title'], {count: 1});
const buttonSubmit = () => get(['verify-email-panel', 'button-submit']);
const paragraphNoToken = () => get(['verify-email-panel', 'paragraph-no-token']);
const linkToLogin = () => get(['verify-email-panel', 'link-to-login']);
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

    it('with token', () => {
        cy.visit(`/verify?token=${repeat('abcdefgh', 8)}`);
        title().should('have.text', 'Verify your Email');
        buttonSubmit().should('have.length', 1).should('not.be.disabled');
        paragraphNoToken().should('have.length', 0);
        linkToLogin().should('have.length', 0);
    });
});
