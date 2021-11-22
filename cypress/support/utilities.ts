import {join} from 'lodash';

export function logout() {
    getCySelector(['navbar', 'button-logout'], {count: 1, invisible: true})
        .should('not.be.disabled')
        .click({force: true});
    cy.url().should('include', '/login');
}

export function login(username: string, password: string) {
    cy.visit('/login');
    cy.url().should('eq', 'http://localhost:3000/login');
    getCySelector(['login-panel', 'input-identifier']).type(username);
    getCySelector(['login-panel', 'input-password']).type(password);
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/configurations');
}

export function getByDataCy(dataCyContains: string, props?: {count?: number}) {
    if (props === undefined) {
        return cy.root().get(`[data-cy*="${dataCyContains}"]`);
    } else {
        return cy
            .root()
            .get(`[data-cy*="${dataCyContains}"]`)
            .should('have.length', props.count);
    }
}

export function getCySelector(
    selectors: string[],
    props?: {count?: number; invisible?: boolean},
): Cypress.Chainable<JQuery<HTMLElement>> {
    const grab = () =>
        cy.root().get(
            join(
                selectors.map((s) => `[data-cy*="${s}"]`),
                ' ',
            ) + (props?.invisible ? '' : ':visible'),
        );
    return props?.count !== undefined
        ? grab().should('have.length', props.count)
        : grab();
}

export function assertDataCy(
    element: Cypress.Chainable<JQuery<HTMLElement>>,
    dataCy: string,
) {
    element.should('have.attr', 'data-cy').and('include', dataCy);
}
