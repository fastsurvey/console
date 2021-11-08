import * as utilities from '../../support/utilities';

const {logout, reloadAccount} = utilities;

function login(username: string, password: string) {
    utilities.login(username, password);

    // go to account page
    cy.get('button')
        .contains('Account')
        .should('have.length', 1)
        .parents('button')
        .should('not.be.disabled')
        .click({force: true});
    cy.url().should('eq', 'http://localhost:3000/account');
}

describe('The Account Page', () => {
    Cypress.Cookies.debug(true);

    // @ts-ignore
    after(cy.seedAccountData);

    function assertTabState(selectedTab: 'identification' | 'password') {
        cy.get('@settingsSection')
            .find('button')
            .contains(
                selectedTab === 'identification'
                    ? 'Identification'
                    : 'Password',
            )
            .should('have.length', 1)
            .should('have.class', 'bg-blue-50');

        cy.get('@settingsSection')
            .find('button')
            .contains(
                selectedTab === 'identification'
                    ? 'Password'
                    : 'Identification',
            )
            .should('have.length', 1)
            .should('not.have.class', 'bg-blue-50')
            .should('have.class', 'text-gray-500');
    }

    function assertValidation(props: {
        parentSection: string;
        valid: boolean;
        contains: string;
    }) {
        cy.get(props.parentSection)
            .find('div:visible')
            .contains(props.contains)
            .should('have.length', 1)
            .parent()
            .should(
                'have.class',
                props.valid ? 'text-green-900' : 'text-red-900',
            )
            .find('svg')
            .should('have.length', 1)
            .parent()
            .should(
                'have.class',
                props.valid ? 'icon-dark-green' : 'icon-dark-red',
            );
    }

    it('account page looks as expected, navigation works', () => {
        cy.fixture('account.json').then((json) => {
            const {username: USERNAME, password: PASSWORD} = json;

            login(USERNAME, PASSWORD);

            cy.get('h1')
                .contains('Modify your Account')
                .should('have.length', 1);
            cy.get('h2:visible').should('have.length', 3);
            cy.get('h2')
                .contains('Account Settings')
                .should('have.length', 1)
                .parents('section')
                .as('settingsSection');
            cy.get('h2')
                .contains('Delete your account forever')
                .should('have.length', 1);
            cy.get('h2')
                .contains('Payment Information')
                .should('have.length', 1);

            assertTabState('identification');
            cy.get('@settingsSection').find('input').should('have.length', 2);

            cy.get('@settingsSection')
                .find('button')
                .contains('Password')
                .click();
            assertTabState('password');
            cy.get('@settingsSection').find('input').should('have.length', 1);

            cy.get('@settingsSection')
                .find('button')
                .contains('Identification')
                .click();
            assertTabState('identification');
        });
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

    function initUsernameSection() {
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

        //labels now present:
        //   @settingsSection
        //   @emailInput
        //   @usernameInput
        //   @cancelUsername
        //   @changeUsername
    }

    it('username change works as expected', () => {
        cy.fixture('account.json').then((json) => {
            const {
                username: USERNAME,
                tmpUsername: TMP_USERNAME,
                password: PASSWORD,
            } = json;

            login(USERNAME, PASSWORD);

            cy.get('h2')
                .contains('Account Settings')
                .parents('section')
                .as('settingsSection');

            assertTabState('identification');
            initUsernameSection();

            cy.get('@emailInput').should('be.disabled');
            cy.get('@usernameInput').should('not.be.disabled');
            assertUsernameState(USERNAME, false, false);

            cy.get('@usernameInput').clear();
            assertUsernameState('', true, false);
            assertValidation({
                parentSection: '@settingsSection',
                contains: 'username too short (≥ 1 character)',
                valid: false,
            });

            cy.get('@cancelUsername').click();
            assertUsernameState(USERNAME, false, false);

            cy.get('@usernameInput').clear().type(TMP_USERNAME);
            assertUsernameState(TMP_USERNAME, true, true);

            cy.get('@cancelUsername').click();
            assertUsernameState(USERNAME, false, false);

            cy.get('@usernameInput').clear().type(TMP_USERNAME);
            cy.get('@changeUsername').click();

            cy.get('h2')
                .contains('Change username?')
                .should('have.length', 1)
                .parents('section')
                .as('usernamePopup');

            cy.get('@usernamePopup')
                .find('div')
                .contains(`fastsurvey.de/${USERNAME}/<survey-id>`)
                .should('have.length', 1);
            cy.get('@usernamePopup')
                .find('div')
                .contains(`fastsurvey.de/${TMP_USERNAME}/<survey-id>`)
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

            assertUsernameState(USERNAME, false, false);

            cy.get('@usernameInput').clear().type(TMP_USERNAME);
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

            assertUsernameState(TMP_USERNAME, false, false);

            // refresh the page
            reloadAccount();

            initUsernameSection();
            assertUsernameState(TMP_USERNAME, false, false);

            logout();
            login(TMP_USERNAME, PASSWORD);

            initUsernameSection();
            assertUsernameState(TMP_USERNAME, false, false);

            cy.get('@usernameInput').clear().type(USERNAME);
            assertUsernameState(USERNAME, true, true);
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

            assertUsernameState(USERNAME, false, false);

            reloadAccount();

            initUsernameSection();
            assertUsernameState(USERNAME, false, false);
        });
    });

    function initPasswordSection() {
        cy.get('h2:visible')
            .contains('Account Settings')
            .parents('section')
            .as('settingsSection')
            .find('button')
            .contains('Password')
            .click();

        cy.get('@settingsSection')
            .find('input')
            .should('have.length', 1)
            .first()
            .as('passwordInput')
            .should('have.attr', 'type')
            .and('eq', 'password');

        cy.get('button')
            .contains('cancel')
            .should('have.length', 1)
            .parents('button')
            .as('cancelPassword');
        cy.get('button')
            .contains('change password')
            .should('have.length', 1)
            .parents('button')
            .as('changePassword');

        // labels now present:
        //    @settingsSection
        //    @passwordInput
        //    @cancelPassword
        //    @changePassword
    }

    function assertPasswordState(
        value: string,
        cancelActive: boolean,
        changeActive: boolean,
    ) {
        if (value.length > 0) {
            cy.get('@passwordInput').should('have.value', value);
        } else {
            cy.get('@passwordInput').should('be.empty');
        }
        cy.get('@cancelPassword').should(
            (cancelActive ? 'not.be' : 'be') + '.disabled',
        );
        cy.get('@changePassword').should(
            (changeActive ? 'not.be' : 'be') + '.disabled',
        );
    }

    it('password change works as expected', () => {
        cy.fixture('account.json').then((json) => {
            const {
                username: USERNAME,
                password: PASSWORD,
                tmpPassword: TMP_PASSWORD,
            } = json;

            login(USERNAME, PASSWORD);

            initPasswordSection();
            assertTabState('password');

            cy.get('@passwordInput').should('not.be.disabled');
            assertPasswordState('', false, false);

            cy.get('@passwordInput').type('1');

            assertPasswordState('1', true, false);
            assertValidation({
                parentSection: '@settingsSection',
                contains: 'password too short (≥ 8 characters)',
                valid: false,
            });

            cy.get('@passwordInput').clear().type(TMP_PASSWORD);
            assertPasswordState(TMP_PASSWORD, true, true);

            cy.get('@cancelPassword').click();
            assertPasswordState('', false, false);

            cy.get('@passwordInput').clear().type(TMP_PASSWORD);
            assertPasswordState(TMP_PASSWORD, true, true);

            cy.get('@changePassword').click();
            cy.get('div')
                .contains('Success: Password has been changed')
                .should('have.length', 1);

            reloadAccount();
            logout();
            login(USERNAME, TMP_PASSWORD);
            initPasswordSection();

            assertPasswordState('', false, false);
            cy.get('@passwordInput').type(PASSWORD);
            assertPasswordState(PASSWORD, true, true);
            cy.get('@changePassword').click();
            cy.get('div')
                .contains('Success: Password has been changed')
                .should('have.length', 1);

            reloadAccount();
            logout();
            login(USERNAME, PASSWORD);
        });
    });
});
