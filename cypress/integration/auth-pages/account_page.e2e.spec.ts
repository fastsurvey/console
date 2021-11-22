import * as utilities from '../../support/utilities';

const {logout, getCySelector, assertDataCy} = utilities;

const get = getCySelector;

const general = {
    settings: () => get(['account-section-settings'], {count: 1}),
    delete: () => get(['account-section-delete'], {count: 1}),
    payment: () => get(['account-section-payment'], {count: 1}),
    successMessage: () => get(['message-panel-success'], {count: 1}),
    accountButton: () => get(['navbar', 'button-account'], {count: 1, invisible: true}),
};

const getFromSettings = (selectors: string[]) =>
    get(['account-section-settings', ...selectors], {count: 1});

const settings = {
    validation: () => getFromSettings(['validation-bar']),

    tabId: () => getFromSettings(['tab-identification']),
    tabPassword: () => getFromSettings(['tab-password']),

    email: () => getFromSettings(['input-email']),
    username: () => getFromSettings(['input-username']),
    cancelUsername: () => getFromSettings(['button-cancel-username']),
    submitUsername: () => getFromSettings(['button-submit-username']),

    password: () => getFromSettings(['input-password']),
    cancelPassword: () => getFromSettings(['button-cancel-password']),
    submitPassword: () => getFromSettings(['button-submit-password']),
};

const getFromPopup = (selectors: string[]) =>
    get(['popup-panel', ...selectors], {count: 1});

const popup = {
    panel: () => get(['popup-panel'], {count: 1, invisible: true}),
    cancelUsername: () => getFromPopup(['button-cancel-username']),
    submitUsername: () => getFromPopup(['button-submit-username']),
};

describe('The Account Page', function () {
    // @ts-ignore
    after(cy.seedAccountData);

    function loginAndGoToAccountPage(id: string, pw: string) {
        utilities.login(id, pw);
        general.accountButton().click({force: true});
        cy.url().should('include', '/account');
    }

    beforeEach(() => {
        cy.fixture('account.json')
            .as('accountJSON')
            .then((accountJSON) => {
                loginAndGoToAccountPage(accountJSON.USERNAME, accountJSON.PASSWORD);
            });
    });

    // Validate that the correct tab is visible
    function assertTabState(selected: 'id' | 'pw') {
        assertDataCy(settings.tabPassword(), selected === 'pw' ? 'active' : 'passive');
        assertDataCy(settings.tabId(), selected === 'id' ? 'active' : 'passive');

        (selected === 'id'
            ? [
                  settings.username(),
                  settings.email(),
                  settings.cancelUsername(),
                  settings.submitUsername(),
              ]
            : [
                  settings.password(),
                  settings.cancelPassword(),
                  settings.submitPassword(),
              ]
        ).map((x) => x.should('be.visible'));
    }

    function assertValidation(valid: boolean) {
        assertDataCy(settings.validation(), valid ? 'isvalid' : 'isinvalid');
    }

    it('account page looks as expected, navigation works', function () {
        // the sections exist
        cy.get('h1').should('have.length', 1);
        cy.get('section:visible').should('have.length', 3);
        general.settings();
        general.delete();
        general.payment();

        // tab switching works
        assertTabState('id');
        settings.tabPassword().click();
        assertTabState('pw');
        settings.tabId().click();
        assertTabState('id');
    });

    function assertUsernameState(
        value: string,
        cancelActive: boolean,
        changeActive: boolean,
    ) {
        if (value.length > 0) {
            settings.username().should('have.value', value);
        } else {
            settings.username().should('be.empty');
        }
        settings.cancelUsername().should((cancelActive ? 'not.' : '') + 'be.disabled');
        settings.submitUsername().should((changeActive ? 'not.' : '') + 'be.disabled');
    }

    it('username change works as expected', function () {
        const {USERNAME, TMP_USERNAME, PASSWORD} = this.accountJSON;

        // initial state is correct
        assertTabState('id');
        settings.email().should('be.disabled');
        settings.username().should('not.be.disabled');
        assertUsernameState(USERNAME, false, false);

        // valid state for empty settings.username
        settings.username().clear();
        assertUsernameState('', true, false);
        assertValidation(false);

        // settings.cancelUsername button works
        settings.username().clear().type(TMP_USERNAME);
        assertUsernameState(TMP_USERNAME, true, true);
        settings.cancelUsername().click();
        assertUsernameState(USERNAME, false, false);

        // username popup looks as expected
        // cancel closes popup and resets settings.username
        settings.username().clear().type(TMP_USERNAME);
        settings.submitUsername().click();
        popup.panel().should('be.visible');
        popup
            .panel()
            .find('div')
            .contains(`fastsurvey.de/${USERNAME}/<survey-id>`)
            .should('have.length', 1);
        popup
            .panel()
            .find('div')
            .contains(`fastsurvey.de/${TMP_USERNAME}/<survey-id>`)
            .should('have.length', 1);
        popup.submitUsername();
        popup.cancelUsername().click();
        popup.panel().should('not.be.visible');
        assertUsernameState(USERNAME, false, false);

        // switch from TMP_USERNAME to USERNAME again
        settings.username().clear().type(TMP_USERNAME);
        settings.submitUsername().click();
        popup.panel().should('be.visible');
        popup.submitUsername().click();
        popup.panel().should('not.be.visible');
        assertUsernameState(TMP_USERNAME, false, false);

        // page reload (cookie login) still works
        cy.reload();
        assertUsernameState(TMP_USERNAME, false, false);
        logout();
        loginAndGoToAccountPage(TMP_USERNAME, PASSWORD);
        assertUsernameState(TMP_USERNAME, false, false);

        // switch back from USERNAME to TMP_USERNAME
        settings.username().clear().type(USERNAME);
        settings.submitUsername().click();
        popup.panel().should('be.visible');
        popup.submitUsername().click();
        popup.panel().should('not.be.visible');
        assertUsernameState(USERNAME, false, false);

        // page reload (cookie login) still works
        cy.reload();
        assertUsernameState(USERNAME, false, false);
    });

    function assertPasswordState(
        value: string,
        cancelActive: boolean,
        changeActive: boolean,
    ) {
        if (value.length > 0) {
            settings.password().should('have.value', value);
        } else {
            settings.password().should('be.empty');
        }
        settings.cancelPassword().should((cancelActive ? 'not.' : '') + 'be.disabled');
        settings.submitPassword().should((changeActive ? 'not.' : '') + 'be.disabled');
    }

    it('password change works as expected', function () {
        const {USERNAME, TMP_PASSWORD, PASSWORD} = this.accountJSON;

        settings.tabPassword().click();

        settings.password().should('not.be.disabled');
        assertPasswordState('', false, false);

        settings.password().type('1');

        assertPasswordState('1', true, false);
        assertValidation(false);

        settings.password().clear().type(TMP_PASSWORD);
        assertPasswordState(TMP_PASSWORD, true, true);

        settings.cancelPassword().click();
        assertPasswordState('', false, false);

        settings.password().clear().type(TMP_PASSWORD);
        assertPasswordState(TMP_PASSWORD, true, true);

        settings.submitPassword().click();
        general.successMessage();

        cy.reload();
        logout();
        loginAndGoToAccountPage(USERNAME, TMP_PASSWORD);

        settings.tabPassword().click();

        assertPasswordState('', false, false);
        settings.password().type(PASSWORD);
        assertPasswordState(PASSWORD, true, true);
        settings.submitPassword().click();
        general.successMessage();

        cy.reload();
        logout();
        loginAndGoToAccountPage(USERNAME, PASSWORD);
    });
});
