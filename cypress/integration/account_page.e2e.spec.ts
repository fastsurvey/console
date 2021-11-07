const OLD_USERNAME = 'blueberry';
const NEW_USERNAME = 'blueberry-2';

Cypress.Cookies.debug(true);

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

it('account page looks as expected, navigation works', () => {
    cy.visit('/login');
    cy.get('input').first().type(OLD_USERNAME);
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
    cy.get('h2:visible').should('have.length', 3);
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
    cy.get('@settingsSection').find('input').should('have.length', 2);

    cy.get('@settingsSection').find('button').contains('Password').click();
    assertTabState('password');
    cy.get('@settingsSection').find('input').should('have.length', 1);

    cy.get('@settingsSection')
        .find('button')
        .contains('Identification')
        .click();
    assertTabState('identification');
});

function assertUsernameState(
    value: string,
    cancelActive: boolean,
    changeActive: boolean,
) {
    if (value.length > 0) {
        cy.get('@usernameInput').should('have.value', value);
    } else {
        cy.get('@usernameInput').should('be.empty');
    }
    cy.get('@cancelUsername').should(
        (cancelActive ? 'not.be' : 'be') + '.disabled',
    );
    cy.get('@changeUsername').should(
        (changeActive ? 'not.be' : 'be') + '.disabled',
    );
}

function assertValidation(props: {
    parentSection: string;
    valid: boolean;
    contains: string;
}) {
    // TODO: Test the validation message text, not only the color
    cy.get(props.parentSection)
        .find('div')
        .contains(props.contains)
        .should('have.length', 1)
        .parent()
        .should('have.class', props.valid ? 'text-green-900' : 'text-red-900')
        .find('svg')
        .should('have.length', 1)
        .parent()
        .should(
            'have.class',
            props.valid ? 'icon-dark-green' : 'icon-dark-red',
        );
}

function initSettingsSection() {
    cy.get('h2:visible')
        .should('have.length', 3)
        .contains('Account Settings')
        .parents('section')
        .as('settingsSection');

    cy.get('@settingsSection')
        .find('input')
        .should('have.length', 2)
        .first()
        .as('emailInput')
        .should('have.attr', 'type')
        .and('eq', 'text');

    cy.get('@settingsSection')
        .find('input')
        .last()
        .as('usernameInput')
        .should('have.attr', 'type')
        .and('eq', 'text');

    cy.get('button')
        .contains('cancel')
        .should('have.length', 1)
        .parents('button')
        .as('cancelUsername');
    cy.get('button')
        .contains('change username')
        .should('have.length', 1)
        .parents('button')
        .as('changeUsername');

    /*
     labels now present:
        @settingsSection
        @emailInput
        @usernameInput
        @cancelUsername
        @changeUsername
    */
}

it('username change works as expected', () => {
    cy.visit('/login');
    cy.get('input').first().type(OLD_USERNAME);
    cy.get('input').last().type('12345678');
    cy.get('button').contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/configurations');

    cy.get('button').contains('Account').click({force: true});
    cy.url().should('eq', 'http://localhost:3000/account');

    cy.get('h2')
        .contains('Account Settings')
        .parents('section')
        .as('settingsSection');

    assertTabState('identification');
    initSettingsSection();

    cy.get('@emailInput').should('be.disabled');
    cy.get('@usernameInput').should('not.be.disabled');
    assertUsernameState(OLD_USERNAME, false, false);

    cy.get('@usernameInput').clear();
    assertUsernameState('', true, false);
    assertValidation({
        parentSection: '@settingsSection',
        contains: 'username too short (≥ 1 character)',
        valid: false,
    });

    cy.get('@cancelUsername').click();
    assertUsernameState(OLD_USERNAME, false, false);

    cy.get('@usernameInput').clear().type(NEW_USERNAME);
    assertUsernameState(NEW_USERNAME, true, true);

    cy.get('@cancelUsername').click();
    assertUsernameState(OLD_USERNAME, false, false);

    cy.get('@usernameInput').clear().type(NEW_USERNAME);
    cy.get('@changeUsername').click();

    cy.get('h2')
        .contains('Change username?')
        .should('have.length', 1)
        .parents('section')
        .as('usernamePopup');

    cy.get('@usernamePopup')
        .find('div')
        .contains(`fastsurvey.de/${OLD_USERNAME}/<survey-id>`)
        .should('have.length', 1);
    cy.get('@usernamePopup')
        .find('div')
        .contains(`fastsurvey.de/${NEW_USERNAME}/<survey-id>`)
        .should('have.length', 1);

    cy.get('@usernamePopup').find('button').should('have.length', 2);
    cy.get('@usernamePopup')
        .find('button')
        .contains('confirm')
        .should('have.length', 1);
    cy.get('@usernamePopup')
        .find('button')
        .contains('cancel')
        .should('have.length', 1)
        .click();

    cy.get('h2').contains('Change username?').should('have.length', 1);

    assertUsernameState(OLD_USERNAME, false, false);

    cy.get('@usernameInput').clear().type(NEW_USERNAME);
    cy.get('@changeUsername').click();

    cy.get('h2')
        .contains('Change username?')
        .parents('section')
        .as('usernamePopup');

    cy.get('@usernamePopup')
        .find('button')
        .contains('confirm')
        .should('have.length', 1)
        .click();

    // wait until request is finished
    cy.get('h2').contains('Change username?').should('not.be.visible');

    assertUsernameState(NEW_USERNAME, false, false);

    // refresh the page
    cy.visit('/account');
    cy.url().should('eq', 'http://localhost:3000/account');

    initSettingsSection();
    assertUsernameState(NEW_USERNAME, false, false);

    // log out and log in again
    cy.get('button')
        .contains('Logout')
        .should('have.length', 1)
        .parents('button')
        .should('not.be.disabled')
        .click({force: true});
    cy.url().should('eq', 'http://localhost:3000/login');

    cy.get('input').first().type(NEW_USERNAME);
    cy.get('input').last().type('12345678');

    cy.get('button').contains('Login').click();

    cy.url().should('eq', 'http://localhost:3000/configurations');
    cy.get('button').contains('Account').click({force: true});
    cy.url().should('eq', 'http://localhost:3000/account');

    initSettingsSection();
    assertUsernameState(NEW_USERNAME, false, false);

    cy.get('@usernameInput').clear().type(OLD_USERNAME);
    assertUsernameState(OLD_USERNAME, true, true);
    cy.get('@changeUsername').click();

    cy.get('h2')
        .contains('Change username?')
        .should('have.length', 1)
        .parents('section')
        .as('usernamePopup');

    cy.get('@usernamePopup')
        .find('button')
        .contains('confirm')
        .should('have.length', 1)
        .click();

    // wait until request is finished
    cy.get('h2').contains('Change username?').should('not.be.visible');

    assertUsernameState(OLD_USERNAME, false, false);

    // refresh the page
    cy.visit('/account');
    cy.url().should('eq', 'http://localhost:3000/account');

    initSettingsSection();
    assertUsernameState(OLD_USERNAME, false, false);
});
