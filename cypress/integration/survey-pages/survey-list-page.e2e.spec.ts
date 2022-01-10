import {first, last} from 'lodash';
import {login, getCySelector} from '../../support/utilities';
const get = getCySelector;

const buttonNew = () => get(['config-list-button-new'], {count: 1});
const successMessage = () => get(['message-panel-success'], {count: 1});

const panel = (surveyName: string) => ({
    container: () => get([`survey-list-panel-${surveyName}`], {count: 1}),
    linkToFrontend: () =>
        get([`survey-list-panel-${surveyName}`, 'link-to-frontend'], {
            count: 1,
        }),
    linkToEditor: () =>
        get([`survey-list-panel-${surveyName}`, 'link-to-editor'], {
            count: 1,
        }),
    linkToResults: () =>
        get([`survey-list-panel-${surveyName}`, 'link-to-results'], {
            count: 1,
        }),
    toggleActions: () =>
        get([`survey-list-panel-${surveyName}`, 'button-toggle-actions'], {
            count: 1,
        }),
    actionsDropdown: () =>
        get([`survey-list-panel-${surveyName}`, 'actions-dropdown'], {
            invisible: true,
        }),
    actionsButton: (type: 'remove-survey' | 'duplicate-survey' | 'reset-submissions') =>
        get([`survey-list-panel-${surveyName}`, 'actions-dropdown', `button-${type}`], {
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
    cancelReset: () => getFromPopup(['button-cancel-reset']),
    submitReset: () => getFromPopup(['button-submit-reset']),
};

describe('The Survey List Page', () => {
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
            .linkToFrontend()
            .should('have.attr', 'href')
            .and('eq', `https://${frontentLink}`);

        panel(surveyName)
            .linkToEditor()
            .should('have.attr', 'href')
            .and('eq', `/editor/${surveyName}`);

        panel(surveyName).linkToEditor().click();
        cy.url().should('include', `/editor/${surveyName}`);
        cy.go('back');
        cy.url().should('include', '/surveys');

        panel(surveyName).linkToResults().click();
        cy.url().should('include', `/results/${surveyName}`);
        cy.go('back');
        cy.url().should('include', '/surveys');

        panel(surveyName).actionsDropdown().should('have.length', 0);
        panel(surveyName).toggleActions().click();
        panel(surveyName).actionsDropdown().should('have.length', 1);
        panel(surveyName).actionsButton('remove-survey');
        panel(surveyName).actionsButton('duplicate-survey');
        panel(surveyName).actionsButton('reset-submissions');
        panel(surveyName).toggleActions().click();
        panel(surveyName).actionsDropdown().should('have.length', 0);
    }

    const configListPanelIsAbsent = (surveyName: string) => {
        getCySelector([`survey-list-panel-${surveyName}`], {count: 0});
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
            .should('match', /.*editor\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));
                cy.url().should('include', `/editor/${newSurveyName}`);

                // use back button
                cy.go('back');
                cy.url().should('include', '/surveys');
                configListPanelIsWorking(USERNAME, newSurveyName);

                cy.reload();
                configListPanelIsWorking(USERNAME, newSurveyName);
            });
    });

    it('removing a survey works', function () {
        const {USERNAME} = this.accountJSON;

        buttonNew().click();

        cy.url()
            .should('match', /.*editor\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));

                cy.visit('/surveys');
                configListPanelIsWorking(USERNAME, newSurveyName);

                // cancel button on removal popup
                panel(newSurveyName).toggleActions().click();
                panel(newSurveyName).actionsDropdown().should('be.visible');
                panel(newSurveyName).actionsButton('remove-survey').click();
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
                panel(newSurveyName).actionsButton('remove-survey').click();
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
        panel(ORIGINAL_SURVEY_NAME).actionsButton('duplicate-survey').click();
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
        panel(ORIGINAL_SURVEY_NAME).actionsButton('duplicate-survey').click();
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
        cy.url().should('include', `/editor/${DUPLICATE_SURVEY_NAME}`);
        cy.visit('/surveys');
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

    it('resetting submissions works', function () {
        // @ts-ignore
        cy.seedResultsData();

        cy.wait(1000).then(() => {
            cy.reload();

            const {SURVEY} = this.configsJSON.RESULTS;
            const {USERNAME, PASSWORD} = this.accountJSON;
            const SURVEY_NAME = SURVEY['survey_name'];

            const assertSubmissionCount = (count: number) => {
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
                        url: `https://api.dev.fastsurvey.de/users/${USERNAME}/surveys/${SURVEY_NAME}/submissions`,
                        headers: {
                            Authorization: `Bearer ${authResponse.body['access_token']}`,
                            'Content-Type': 'application/json',
                        },
                    }).then((getResponse) => {
                        expect(getResponse.status).to.equal(200);
                        expect(getResponse.body.length).to.equal(count);
                    });
                });
            };

            // assert initial state
            configListPanelIsWorking(USERNAME, SURVEY_NAME);
            assertSubmissionCount(4);

            // cancel button on duplication popup
            panel(SURVEY_NAME).toggleActions().click();
            panel(SURVEY_NAME).actionsButton('reset-submissions').click();
            popup.panel().should('be.visible');
            popup.cancelReset().click();
            popup.panel().should('not.be.visible');
            panel(SURVEY_NAME).actionsDropdown().should('be.visible');

            // config did not change
            configListPanelIsWorking(USERNAME, SURVEY_NAME);
            cy.reload();
            configListPanelIsWorking(USERNAME, SURVEY_NAME);

            // there are still 4 submissions
            assertSubmissionCount(4);

            // duplication popup
            panel(SURVEY_NAME).toggleActions().click();
            panel(SURVEY_NAME).actionsButton('reset-submissions').click();
            popup.submitReset().click();

            cy.wait(1000).then(() => {
                // duplication has workes -> on new page with success message
                successMessage();
                cy.url().should('include', `/surveys`);
                configListPanelIsWorking(USERNAME, SURVEY_NAME);

                // there are still 0 submissions
                assertSubmissionCount(0);
            });
        });
    });

    // I skip testing the search bar for now
});
