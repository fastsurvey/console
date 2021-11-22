import {first, last} from 'lodash';
import * as utilities from '../../support/utilities';

const {login, getCySelector} = utilities;
const get = getCySelector;

const buttonNew = () => get(['config-list-button-new'], {count: 1});
const successMessage = () => get(['message-panel-success'], {count: 1});

const panel = (surveyName: string) => ({
    container: () => get([`config-list-panel-${surveyName}`], {count: 1}),
    linkToFrontend: () =>
        get([`config-list-panel-${surveyName}`, 'link-to-frontend'], {
            count: 1,
        }),
    linkToEditor: () =>
        get([`config-list-panel-${surveyName}`, 'link-to-editor'], {
            count: 1,
        }),
    toggleActions: () =>
        get([`config-list-panel-${surveyName}`, 'button-toggle-actions'], {
            count: 1,
        }),
    actionsDropdown: () =>
        get([`config-list-panel-${surveyName}`, 'actions-dropdown'], {
            invisible: true,
        }),
    actionsButton: (type: 'remove' | 'duplicate') =>
        get([`config-list-panel-${surveyName}`, 'actions-dropdown', `button-${type}`], {
            count: 1,
        }),
});

const getFromPopup = (selectors: string[]) =>
    get(['popup-panel', ...selectors], {count: 1});
const popup = {
    panel: () => get(['popup-panel'], {count: 1, invisible: true}),
    duplicateTitle: () => getFromPopup(['input-duplicate-title']),
    cancelDuplicate: () => getFromPopup(['button-cancel-duplicate']),
    submitDuplicate: () => getFromPopup(['button-submit-duplicate']),
    cancelRemove: () => getFromPopup(['button-cancel-remove']),
    submitRemove: () => getFromPopup(['button-submit-remove']),
};

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
                popup.panel().should('be.visible');
                popup.cancelRemove().click();
                popup.panel().should('not.be.visible');
                panel(newSurveyName).actionsDropdown().should('be.visible');

                // config did not change
                configListPanelIsWorking(USERNAME, newSurveyName);
                cy.reload();
                configListPanelIsWorking(USERNAME, newSurveyName);

                // removal popup
                panel(newSurveyName).toggleActions().click();
                panel(newSurveyName).actionsButton('remove').click();
                popup.panel().should('be.visible');
                popup.submitRemove().click();
                popup.panel().should('not.be.visible');
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
        popup.panel().should('be.visible');
        popup.cancelDuplicate().click();
        popup.panel().should('not.be.visible');
        panel(ORIGINAL_SURVEY_NAME).actionsDropdown().should('be.visible');

        // config did not change
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);
        cy.reload();
        configListPanelIsWorking(USERNAME, ORIGINAL_SURVEY_NAME);

        // duplication popup
        panel(ORIGINAL_SURVEY_NAME).toggleActions().click();
        panel(ORIGINAL_SURVEY_NAME).actionsButton('duplicate').click();
        popup
            .panel()
            .find('div')
            .contains(`you already have a survey \'${ORIGINAL_SURVEY_NAME}\'`)
            .should('have.length', 1);
        popup.submitDuplicate().should('be.disabled');
        popup.duplicateTitle().should('have.value', ORIGINAL_SURVEY_NAME);
        popup
            .duplicateTitle()
            .clear()
            .type(DUPLICATE_SURVEY_NAME)
            .should('have.value', DUPLICATE_SURVEY_NAME);
        popup.submitDuplicate().click();

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
