import * as utilities from '../../support/utilities';

const {logout, reloadAccountPage, getByDataCy, assertDataCy} = utilities;

// PAGESECTIONS
const sectionSettings = () => getByDataCy('account-section-settings', {count: 1});
const sectionDelete = () => getByDataCy('account-section-delete', {count: 1});
const sectionPayment = () => getByDataCy('account-section-payment', {count: 1});

// EMAIL/USERNAME FORM
const emailInput = () => getByDataCy('settings-email-input', {count: 1});
const usernameInput = () => getByDataCy('settings-username-input', {count: 1});
const usernameCancel = () => getByDataCy('settings-username-button-cancel', {count: 1});
const usernameSubmit = () => getByDataCy('settings-username-button-submit', {count: 1});

// PASSWORD FORM
const passwordInput = () => getByDataCy('settings-password-input', {count: 1});
const passwordCancel = () => getByDataCy('settings-password-button-cancel', {count: 1});
const passwordSubmit = () => getByDataCy('settings-password-button-submit', {count: 1});

// TAB BUTTONS
const tabButtonPw = () => getByDataCy('settings-tab-button-password', {count: 1});
const tabButtonId = () => getByDataCy('settings-tab-button-identification', {count: 1});

// POPUP
const popupPanel = () => getByDataCy('popup-panel', {count: 1});
const popupUsernameCancel = () => getByDataCy('username-confirm-cancel', {count: 1});
const popupUsernameSubmit = () => getByDataCy('username-confirm-submit', {count: 1});

describe('The Account Page', function () {
    // @ts-ignore
    after(cy.seedAccountData);

    function loginAndGoToAccountPage(id: string, pw: string) {
        utilities.login(id, pw);
        getByDataCy('navbar-button-account').first().click({force: true});
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
        assertDataCy(tabButtonPw(), selected === 'pw' ? 'active' : 'passive');
        assertDataCy(tabButtonId(), selected === 'id' ? 'active' : 'passive');

        (selected === 'id'
            ? [usernameInput(), emailInput(), usernameCancel(), usernameSubmit()]
            : [passwordInput(), passwordCancel(), passwordSubmit()]
        ).map((x) => x.should('be.visible'));
    }

    function assertValidation(props: {valid: boolean; contains: string}) {
        getByDataCy('account-section-settings')
            .find('div:visible')
            .contains(props.contains)
            .should('have.length', 1)
            .parent()
            .should('have.class', props.valid ? 'text-green-900' : 'text-red-900')
            .find('svg')
            .should('have.length', 1)
            .parent()
            .should('have.class', props.valid ? 'icon-dark-green' : 'icon-dark-red');
    }

    it('account page looks as expected, navigation works', function () {
        // the sections exist
        cy.get('h1').should('have.length', 1);
        cy.get('section:visible').should('have.length', 3);
        sectionSettings();
        sectionDelete();
        sectionPayment();

        // tab switching works
        assertTabState('id');
        tabButtonPw().click();
        assertTabState('pw');
        tabButtonId().click();
        assertTabState('id');
    });

    function assertUsernameState(
        value: string,
        cancelActive: boolean,
        changeActive: boolean,
    ) {
        if (value.length > 0) {
            usernameInput().should('have.value', value);
        } else {
            usernameInput().should('be.empty');
        }
        usernameCancel().should((cancelActive ? 'not.' : '') + 'be.disabled');
        usernameSubmit().should((changeActive ? 'not.' : '') + 'be.disabled');
    }

    it('username change works as expected', function () {
        const {USERNAME, TMP_USERNAME, PASSWORD} = this.accountJSON;

        // initial state is correct
        assertTabState('id');
        emailInput().should('be.disabled');
        usernameInput().should('not.be.disabled');
        assertUsernameState(USERNAME, false, false);

        // valid state for empty usernameInput
        usernameInput().clear();
        assertUsernameState('', true, false);
        assertValidation({
            contains: 'username too short (≥ 1 character)',
            valid: false,
        });

        // usernameCancel button works
        usernameInput().clear().type(TMP_USERNAME);
        assertUsernameState(TMP_USERNAME, true, true);
        usernameCancel().click();
        assertUsernameState(USERNAME, false, false);

        // username popup looks as expected
        // cancel closes popup and resets usernameInput
        usernameInput().clear().type(TMP_USERNAME);
        usernameSubmit().click();
        popupPanel().should('be.visible');
        popupPanel()
            .find('div')
            .contains(`fastsurvey.de/${USERNAME}/<survey-id>`)
            .should('have.length', 1);
        popupPanel()
            .find('div')
            .contains(`fastsurvey.de/${TMP_USERNAME}/<survey-id>`)
            .should('have.length', 1);
        popupUsernameSubmit();
        popupUsernameCancel().click();
        popupPanel().should('not.be.visible');
        assertUsernameState(USERNAME, false, false);

        // switch from TMP_USERNAME to USERNAME again
        usernameInput().clear().type(TMP_USERNAME);
        usernameSubmit().click();
        popupPanel().should('be.visible');
        popupUsernameSubmit().click();
        popupPanel().should('not.be.visible');
        assertUsernameState(TMP_USERNAME, false, false);

        // page reload (cookie login) still works
        // logout and login with TMP_USERNAME works
        reloadAccountPage();
        assertUsernameState(TMP_USERNAME, false, false);
        logout();
        loginAndGoToAccountPage(TMP_USERNAME, PASSWORD);
        assertUsernameState(TMP_USERNAME, false, false);

        // switch back from USERNAME to TMP_USERNAME
        usernameInput().clear().type(USERNAME);
        usernameSubmit().click();
        popupPanel().should('be.visible');
        popupUsernameSubmit().click();
        popupPanel().should('not.be.visible');
        assertUsernameState(USERNAME, false, false);

        // page reload (cookie login) still works
        reloadAccountPage();
        assertUsernameState(USERNAME, false, false);
    });

    function assertPasswordState(
        value: string,
        cancelActive: boolean,
        changeActive: boolean,
    ) {
        if (value.length > 0) {
            passwordInput().should('have.value', value);
        } else {
            passwordInput().should('be.empty');
        }
        passwordCancel().should((cancelActive ? 'not.' : '') + 'be.disabled');
        passwordSubmit().should((changeActive ? 'not.' : '') + 'be.disabled');
    }

    it('password change works as expected', function () {
        const {USERNAME, TMP_PASSWORD, PASSWORD} = this.accountJSON;

        tabButtonPw().click();

        passwordInput().should('not.be.disabled');
        assertPasswordState('', false, false);

        passwordInput().type('1');

        assertPasswordState('1', true, false);
        assertValidation({
            contains: 'password too short (≥ 8 characters)',
            valid: false,
        });

        passwordInput().clear().type(TMP_PASSWORD);
        assertPasswordState(TMP_PASSWORD, true, true);

        passwordCancel().click();
        assertPasswordState('', false, false);

        passwordInput().clear().type(TMP_PASSWORD);
        assertPasswordState(TMP_PASSWORD, true, true);

        passwordSubmit().click();
        getByDataCy('message-panel-success', {count: 1});

        reloadAccountPage();
        logout();
        loginAndGoToAccountPage(USERNAME, TMP_PASSWORD);

        tabButtonPw().click();

        assertPasswordState('', false, false);
        passwordInput().type(PASSWORD);
        assertPasswordState(PASSWORD, true, true);
        passwordSubmit().click();
        getByDataCy('message-panel-success', {count: 1});

        reloadAccountPage();
        logout();
        loginAndGoToAccountPage(USERNAME, PASSWORD);
    });
});
