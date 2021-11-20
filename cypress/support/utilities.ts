import {join} from 'lodash';

export function logout() {
    cy.get('button')
        .contains('Logout')
        .should('have.length', 1)
        .parents('button')
        .should('not.be.disabled')
        .click({force: true});
    cy.url().should('include', '/login');
}

export function login(username: string, password: string) {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.get('input').first().type(username);
    cy.get('input').last().type(password);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/configurations');
}

export function reloadConfigurationsPage() {
    cy.visit('/configurations');
    cy.url().should('include', '/configurations');
}

export function reloadAccountPage() {
    cy.visit('/account');
    cy.url().should('include', '/account');
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
    props?: {count?: number},
): Cypress.Chainable<JQuery<HTMLElement>> {
    const grab = () =>
        cy.root().get(
            join(
                selectors.map((s) => `[data-cy*="${s}"]`),
                ' ',
            ),
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
