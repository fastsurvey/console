function assertTabState(selectedTab: 'identification' | 'password') {
    cy.get('@settingsSection')
        .find('button')
        .contains(
            selectedTab === 'identification' ? 'Identification' : 'Password',
        )
        .should('have.length', 1)
        .should('have.class', 'bg-blue-50');

    cy.get('@settingsSection')
        .find('button')
        .contains(
            selectedTab === 'identification' ? 'Password' : 'Identification',
        )
        .should('have.length', 1)
        .should('not.have.class', 'bg-blue-50')
        .should('have.class', 'text-gray-500');
}

it('account page looks as expected and the navigation works', () => {
    cy.visit('/login');
    cy.get('input').first().type('blueberry');
    cy.get('input').last().type('12345678');
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/configurations');

    cy.get('button')
        .contains('Account')
        .should('have.length', 1)
        .parents('button')
        .should('not.be.disabled')
        .click({force: true});

    cy.url().should('eq', 'http://localhost:3000/account');

    cy.get('h1').contains('Modify your Account').should('have.length', 1);
    cy.get('h2').should('have.length', 3);
    cy.get('h2')
        .contains('Account Settings')
        .should('have.length', 1)
        .parents('section')
        .as('settingsSection');
    cy.get('h2')
        .contains('Delete your account forever')
        .should('have.length', 1)
        .parents('section')
        .as('deleteSection');
    cy.get('h2').contains('Payment Information').should('have.length', 1);

    assertTabState('identification');
    cy.get('@settingsSection').find('button').contains('Password').click();
    assertTabState('password');
    cy.get('@settingsSection')
        .find('button')
        .contains('Identification')
        .click();
    assertTabState('identification');
});
