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

export function reloadConfigurations() {
    cy.visit('/configurations');
    cy.url().should('include', '/configurations');
}

export function reloadAccount() {
    cy.visit('/account');
    cy.url().should('include', '/account');
}
