import {first, last} from 'lodash';
import * as utilities from '../../support/utilities';

const {login, getByDataCy, getCySelector} = utilities;

const buttonNew = () => getByDataCy('config-list-button-new', {count: 1});
const successMessage = () => getByDataCy('message-panel-success', {count: 1});

// TODO: refactor panel getters

const panel = (surveyName: string) => ({
    container: () => getCySelector([`config-list-panel-${surveyName}`], {count: 1}),
    linkToFrontend: () =>
        getCySelector([`config-list-panel-${surveyName}`, 'link-to-frontend'], {
            count: 1,
        }),
    linkToEditor: () =>
        getCySelector([`config-list-panel-${surveyName}`, 'link-to-editor'], {
            count: 1,
        }),
    toggleActions: () =>
        getCySelector([`config-list-panel-${surveyName}`, 'button-toggle-actions'], {
            count: 1,
        }),
    actionsDropdown: () =>
        getCySelector([`config-list-panel-${surveyName}`, 'actions-dropdown'], {
            invisible: true,
        }),
    actionsButton: (type: 'remove' | 'duplicate') =>
        getCySelector(
            [`config-list-panel-${surveyName}`, 'actions-dropdown', `button-${type}`],
            {
                count: 1,
            },
        ),
});

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

        panel(surveyName).linkToFrontend().should('have.text', frontentLink);

        panel(surveyName)
            .container()
            .then(($panel) => {
                if ($panel.attr('data-cy')?.includes('published')) {
                    // not a draft
                    panel(surveyName)
                        .linkToFrontend()
                        .should('have.attr', 'href')
                        .and('eq', `https://${frontentLink}`);
                } else {
                    // a draft
                    panel(surveyName).linkToFrontend().should('not.have.attr', 'href');
                }
            });

        panel(surveyName)
            .linkToEditor()
            .should('have.attr', 'href')
            .and('eq', `/configuration/${surveyName}`);

        panel(surveyName).linkToEditor().click();
        cy.url().should('include', `/configuration/${surveyName}`);
        cy.go('back');
        cy.url().should('include', '/configurations');

        panel(surveyName).actionsDropdown().should('have.length', 0);
        panel(surveyName).toggleActions().click();
        panel(surveyName).actionsDropdown().should('have.length', 1);
        panel(surveyName).actionsButton('remove');
        panel(surveyName).actionsButton('duplicate');
        panel(surveyName).toggleActions().click();
        panel(surveyName).actionsDropdown().should('have.length', 0);
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

                cy.reload();
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

                cy.visit('/configurations');
                configListPanelIsWorking(USERNAME, newSurveyName);

                // cancel button on removal popup
                panel(newSurveyName).toggleActions().click();
                panel(newSurveyName).actionsDropdown().should('be.visible');
                panel(newSurveyName).actionsButton('remove').click();
                popupPanel().should('be.visible');
                popupRemoveCancel().click();
                popupPanel().should('not.be.visible');
                panel(newSurveyName).actionsDropdown().should('be.visible');

                // config did not change
                configListPanelIsWorking(USERNAME, newSurveyName);
                cy.reload();
                configListPanelIsWorking(USERNAME, newSurveyName);

                // removal popup
                panel(newSurveyName).toggleActions().click();
                panel(newSurveyName).actionsButton('remove').click();
                popupPanel().should('be.visible');
                popupRemoveSubmit().click();
                popupPanel().should('not.be.visible');
                successMessage();

                // config is gone
                configListPanelIsAbsent(newSurveyName);
                cy.reload();
                configListPanelIsAbsent(newSurveyName);
            });
    });

    it('duplicating a survey works', function () {
        // @ts-ignore
        cy.seedDuplicationData();
        cy.reload();

        const {ORIGINAL_SURVEY, DUPLICATE_SURVEY} = this.configsJSON.DUPLICATION;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const ORIGINAL_SURVEY_NAME = ORIGINAL_SURVEY['survey_name'];
        const DUPLICATE_SURVEY_NAME = DUPLICATE_SURVEY['survey_name'];
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        // cancel button on duplication popup
        panel(ORIGINAL_SURVEY_NAME).toggleActions().click();
        panel(ORIGINAL_SURVEY_NAME).actionsButton('duplicate').click();
        popupPanel().should('be.visible');
        popupDuplicateCancel().click();
        popupPanel().should('not.be.visible');
        panel(ORIGINAL_SURVEY_NAME).actionsDropdown().should('be.visible');

        // config did not change
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        cy.reload();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        // duplication popup
        panel(ORIGINAL_SURVEY_NAME).toggleActions().click();
        panel(ORIGINAL_SURVEY_NAME).actionsButton('duplicate').click();
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
        cy.visit('/configurations');
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
