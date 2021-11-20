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

// POPUP
const popupPanel = () => getByDataCy('popup-panel', {count: 1});
const popupDuplicateInput = () => getByDataCy('duplicate-input', {count: 1});
const popupDuplicateCancel = () => getByDataCy('duplicate-button-cancel', {count: 1});
const popupDuplicateSubmit = () => getByDataCy('duplicate-button-submit', {count: 1});
const popupRemoveCancel = () => getByDataCy('remove-button-cancel', {count: 1});
const popupRemoveSubmit = () => getByDataCy('remove-button-submit', {count: 1});

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

                reloadConfigurationsPage();
                configListPanelIsWorking(USERNAME, newSurveyName);

                // cancel button on removal popup
                toggleActions(newSurveyName).click();
                actionsDropdown(newSurveyName, 'visible');
                actionsButton(newSurveyName, 'remove').click();
                popupPanel().should('be.visible');
                popupRemoveCancel().click();
                popupPanel().should('not.be.visible');
                actionsDropdown(newSurveyName, 'visible');

                // config did not change
                configListPanelIsWorking(USERNAME, newSurveyName);
                reloadConfigurationsPage();
                configListPanelIsWorking(USERNAME, newSurveyName);

                // removal popup
                toggleActions(newSurveyName).click();
                actionsButton(newSurveyName, 'remove').click();
                popupPanel().should('be.visible');
                popupRemoveSubmit().click();
                popupPanel().should('not.be.visible');
                successMessage();

                // config is gone
                configListPanelIsAbsent(newSurveyName);
                reloadConfigurationsPage();
                configListPanelIsAbsent(newSurveyName);
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

        // cancel button on duplication popup
        toggleActions(ORIGINAL_SURVEY_NAME).click();
        actionsButton(ORIGINAL_SURVEY_NAME, 'duplicate').click();
        popupPanel().should('be.visible');
        popupDuplicateCancel().click();
        popupPanel().should('not.be.visible');
        actionsDropdown(ORIGINAL_SURVEY_NAME, 'visible');

        // config did not change
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        reloadConfigurationsPage();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        // duplication popup
        toggleActions(ORIGINAL_SURVEY_NAME).click();
        actionsButton(ORIGINAL_SURVEY_NAME, 'duplicate').click();
        popupPanel()
            .find('div')
            .contains(`you already have a survey \'${ORIGINAL_SURVEY_NAME}\'`)
            .should('have.length', 1);
        popupDuplicateSubmit().should('be.disabled');
        popupDuplicateInput().should('have.value', ORIGINAL_SURVEY_NAME);
        popupDuplicateInput()
            .clear()
            .type(DUPLICATE_SURVEY_NAME)
            .should('have.value', DUPLICATE_SURVEY_NAME);
        popupDuplicateSubmit().click();

        // duplication has workes -> on new page with success message
        successMessage();
        cy.url().should('include', `/configuration/${DUPLICATE_SURVEY_NAME}`);
        reloadConfigurationsPage();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        configListPanelIsWorking(USERNAME, DUPLICATE_SURVEY_NAME);

        // deepCompare the config-json in database
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
    });

    // I skip testing the search bar for now
});
