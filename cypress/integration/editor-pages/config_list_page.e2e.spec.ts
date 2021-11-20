import {first, last} from 'lodash';
import * as utilities from '../../support/utilities';

const {login, reloadConfigurationsPage, getByDataCy, assertDataCy} = utilities;

const buttonNew = () => getByDataCy('config-list-button-new', {count: 1});
const successMessage = () => getByDataCy('message-panel-success', {count: 1});

const panel = (surveyName: string) =>
    getByDataCy(`config-list-panel-${surveyName}`, {count: 1});
const linkToFrontend = (surveyName: string) =>
    panel(surveyName).find('[data-cy="link-to-frontend"]').should('have.length', 1);
const linkToEditor = (surveyName: string) =>
    panel(surveyName).find('[data-cy="link-to-editor"]').should('have.length', 1);

const toggleActions = (surveyName: string) =>
    panel(surveyName)
        .find('[data-cy="button-to-toggle-actions-dropdown"]')
        .should('have.length', 1);

const actionsDropdown = (surveyName: string, state: 'visible' | 'invisible') =>
    panel(surveyName)
        .find('[data-cy="actions-dropdown"]')
        .should('have.length', state === 'visible' ? 1 : 0);

const actionsButton = (surveyName: string, type: 'remove' | 'duplicate') =>
    panel(surveyName)
        .find('[data-cy="actions-dropdown"]')
        .find(`[data-cy="button-${type}"]`)
        .should('have.length', 1);

describe('The Config List Page', () => {
    // @ts-ignore
    before(cy.seedConfigData);

    // @ts-ignore
    after(cy.seedConfigData);

    beforeEach(() => {
        cy.fixture('account.json')
            .as('accountJSON')
            .then((accountJSON: any) => {
                login(accountJSON.USERNAME, accountJSON.PASSWORD);
            });
        cy.fixture('configs.json').as('configsJSON');
    });

    function configListPanelIsWorking(username: string, surveyName: string) {
        const frontentLink = `dev.fastsurvey.de/${username}/${surveyName}`;

        linkToFrontend(surveyName).should('have.text', frontentLink);

        panel(surveyName).then(($panel) => {
            if ($panel.attr('data-cy')?.includes('published')) {
                // not a draft
                linkToFrontend(surveyName)
                    .should('have.attr', 'href')
                    .and('eq', `https://${frontentLink}`);
            } else {
                // a draft
                linkToFrontend(surveyName).should('not.have.attr', 'href');
            }
        });

        linkToEditor(surveyName)
            .should('have.attr', 'href')
            .and('eq', `/configuration/${surveyName}`);

        linkToEditor(surveyName).click();
        cy.url().should('include', `/configuration/${surveyName}`);
        cy.go('back');
        cy.url().should('include', '/configurations');

        actionsDropdown(surveyName, 'invisible');
        toggleActions(surveyName).click();
        actionsDropdown(surveyName, 'visible');
        actionsButton(surveyName, 'remove');
        actionsButton(surveyName, 'duplicate');
        toggleActions(surveyName).click();
        actionsDropdown(surveyName, 'invisible');
    }

    const configListPanelIsAbsent = (surveyName: string) => {
        getByDataCy(`config-list-panel-${surveyName}`, {count: 0});
    };

    it('seed surveys are present', function () {
        const {USERNAME} = this.accountJSON;
        const {SURVEYS_TO_KEEP} = this.configsJSON;
        SURVEYS_TO_KEEP.forEach((s: string) => configListPanelIsWorking(USERNAME, s));
    });

    it('creating a survey works', function () {
        const {USERNAME} = this.accountJSON;

        buttonNew().click();

        cy.url()
            .should('match', /.*configuration\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));
                cy.url().should('include', `/configuration/${newSurveyName}`);

                // use back button
                cy.go('back');
                cy.url().should('include', '/configurations');
                configListPanelIsWorking(USERNAME, newSurveyName);

                reloadConfigurationsPage();
                configListPanelIsWorking(USERNAME, newSurveyName);
            });
    });

    it('removing a survey works', function () {
        const {USERNAME} = this.accountJSON;

        buttonNew().click();

        cy.url()
            .should('match', /.*configuration\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));
                const listPanelIsWorking = () =>
                    configListPanelIsWorking(USERNAME, newSurveyName);
                const listPanelIsAbsent = () => configListPanelIsAbsent(newSurveyName);

                reloadConfigurationsPage();
                listPanelIsWorking();
                toggleActions(newSurveyName).click();
                actionsDropdown(newSurveyName, 'visible');
                actionsButton(newSurveyName, 'remove').click();

                // TODO: refactor modal tests
                // Remove modal is visible
                cy.get('h2:visible')
                    .contains('Remove this survey permanently?')
                    .should('have.length', 1)
                    .parents('section')
                    .as('removeModal');

                cy.get('@removeModal')
                    .find('button:visible')
                    .should('have.length', 2)
                    .contains('cancel')
                    .should('have.length', 1)
                    .click();

                // Remove modal is closed
                cy.get('h2')
                    .contains('Remove this survey permanently?')
                    .should('not.be.visible');

                listPanelIsWorking();
                reloadConfigurationsPage();
                listPanelIsWorking();

                toggleActions(newSurveyName).click();
                actionsButton(newSurveyName, 'remove').click();

                // TODO: refactor modal tests
                cy.get('button:visible')
                    .contains('remove survey')
                    .should('have.length', 1)
                    .click();

                // Remove modal is closed
                cy.get('h2')
                    .contains('Remove this survey permanently?')
                    .should('not.be.visible');

                // Success message is visible
                successMessage();

                listPanelIsAbsent();
                reloadConfigurationsPage();
                listPanelIsAbsent();
            });
    });

    it('duplicating a survey works', function () {
        // @ts-ignore
        cy.seedDuplicationData();
        reloadConfigurationsPage();

        const {ORIGINAL_SURVEY, DUPLICATE_SURVEY} = this.configsJSON.DUPLICATION;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const ORIGINAL_SURVEY_NAME = ORIGINAL_SURVEY['survey_name'];
        const DUPLICATE_SURVEY_NAME = DUPLICATE_SURVEY['survey_name'];
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        toggleActions(ORIGINAL_SURVEY_NAME).click();
        actionsButton(ORIGINAL_SURVEY_NAME, 'duplicate').click();

        // TODO: refactor modal tests
        // Duplicate modal is visible
        cy.get('h2:visible')
            .contains('Duplicate this survey?')
            .should('have.length', 1)
            .parents('section')
            .as('duplicateModal');

        cy.get('@duplicateModal')
            .find('button:visible')
            .should('have.length', 2)
            .contains('cancel')
            .should('have.length', 1)
            .click();

        // Duplicate modal is closed
        cy.get('h2').contains('Duplicate this survey?').should('not.be.visible');
        actionsDropdown(ORIGINAL_SURVEY_NAME, 'visible');

        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        reloadConfigurationsPage();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        toggleActions(ORIGINAL_SURVEY_NAME).click();
        actionsButton(ORIGINAL_SURVEY_NAME, 'duplicate').click();

        // TODO: refactor modal tests
        cy.get('h2:visible')
            .contains('Duplicate this survey?')
            .should('have.length', 1)
            .parents('section')
            .as('duplicateModal');

        cy.get('@duplicateModal')
            .find('button:visible')
            .contains('duplicate survey')
            .should('have.length', 1)
            .parents('button')
            .should('be.disabled');

        cy.get('@duplicateModal')
            .find('input')
            .should('have.length', 1)
            .should('not.be.disabled')
            .should('have.value', ORIGINAL_SURVEY_NAME);

        cy.get('@duplicateModal')
            .find('div')
            .contains(
                `has to be unique, you already have a survey \'${ORIGINAL_SURVEY_NAME}\'`,
            )
            .should('have.length', 1);

        cy.get('@duplicateModal')
            .find('input')
            .clear()
            .type(DUPLICATE_SURVEY_NAME)
            .should('have.value', DUPLICATE_SURVEY_NAME);

        cy.get('@duplicateModal')
            .find('button')
            .contains('duplicate survey')
            .parents('button')
            .should('not.be.disabled')
            .click();

        // Duplicate modal has been closed
        cy.get('h2').contains('Duplicate this survey?').should('not.be.visible');

        // Success message is visible
        successMessage();

        cy.url().should('include', `/configuration/${DUPLICATE_SURVEY_NAME}`);
        reloadConfigurationsPage();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        configListPanelIsWorking(USERNAME, DUPLICATE_SURVEY_NAME);

        cy.request({
            method: 'POST',
            url: 'https://api.dev.fastsurvey.de/authentication',
            body: {
                identifier: USERNAME,
                password: PASSWORD,
            },
        }).then((authResponse) => {
            expect(authResponse.status).to.equal(200);
            cy.request({
                method: 'GET',
                url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys`,
                headers: {
                    Authorization: `Bearer ${authResponse.body['access_token']}`,
                    'Content-Type': 'application/json',
                },
            }).then((getResponse) => {
                expect(getResponse.status).to.equal(200);
                const duplicateSurveyOnServer = first(
                    getResponse.body.filter(
                        (c: any) => c['survey_name'] === DUPLICATE_SURVEY_NAME,
                    ),
                );
                expect(duplicateSurveyOnServer).to.deep.equal(DUPLICATE_SURVEY);
            });
        });

        // - [x] make manual api request to create a specific survey
        // - [x] load that complex config from fixtures/
        // - [x] in that config:
        // - [x]   * include every field type
        // - [x]   * use non-sequential field identifiers
        // - [x] Afterwards:
        // - [x]  1. reload page
        // - [x]  2. check if the new config is in the config list
        // - [x]  3. duplicate (also check modal)
        // - [x]  4. check of new route is correct
        // - [x]  5. check if new duplicated config is in the config list
        // - [x]  6. reload page
        // - [x]  7. check again if new duplicated config is present
        // - [x]  8. Manuall load config.json from backend and:
        // - [x]      8.1 check if identifiers are sequential
        // - [x]      8.2 do a deep comparison for everything else
    });

    // I skip testing the search bar for now
});
