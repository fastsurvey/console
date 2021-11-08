import {first, last} from 'lodash';
import * as utilities from '../../support/utilities';

const {login, reloadConfigurations} = utilities;

function configListPanelIsWorking(surveyName: string) {
    cy.fixture('account.json').then((accountJSON) => {
        cy.get('div')
            .contains(`dev.fastsurvey.de/${accountJSON.username}/${surveyName}`)
            .should('have.length', 1)
            .parents('section')
            .as(`configListPanel-${surveyName}`);

        cy.get(`@configListPanel-${surveyName}`).then(($panel) => {
            if ($panel.find('a').first().attr('href') !== undefined) {
                // not a draft
                cy.get('a:visible')
                    .contains(
                        `dev.fastsurvey.de/${accountJSON.username}/${surveyName}`,
                    )
                    .should('have.length', 1)
                    .should('have.attr', 'href')
                    .and(
                        'include',
                        `https://dev.fastsurvey.de/${accountJSON.username}/${surveyName}`,
                    );
            } else {
                // a draft
                cy.get('a:visible')
                    .contains(
                        `dev.fastsurvey.de/${accountJSON.username}/${surveyName}`,
                    )
                    .should('have.length', 1)
                    .should('not.have.attr', 'href');
            }

            cy.get(`@configListPanel-${surveyName}`)
                .find('a:visible')
                .contains('edit')
                .parents('a')
                .should('have.length', 1)
                .should('have.attr', 'href')
                .and('eq', `/configuration/${surveyName}`);

            cy.get(`@configListPanel-${surveyName}`).contains('edit').click();
            cy.url().should('include', `/configuration/${surveyName}`);
            cy.go('back');
            cy.url().should('include', '/configurations');
        });
    });
}

function configListPanelIsAbsent(surveyName: string) {
    cy.get('h1').contains('Edit & Create Surveys').should('have.length', 1);

    cy.fixture('account.json').then((accountJSON) => {
        cy.get('div')
            .contains(`dev.fastsurvey.de/${accountJSON.username}/${surveyName}`)
            .should('have.length', 0);
    });
}

describe('The Config List Page', () => {
    // @ts-ignore
    before(cy.seedConfigData);

    // @ts-ignore
    after(cy.seedConfigData);

    beforeEach(() => {
        cy.fixture('account.json').then((accountJSON: any) => {
            login(accountJSON.username, accountJSON.password);
        });
    });

    it('seed surveys are present', () => {
        cy.get('a:visible').should('have.length', 4);

        cy.fixture('configs.json').then((configJSON: any) => {
            configJSON.surveysToKeep.forEach(configListPanelIsWorking);
        });
    });

    it('creating a survey works', () => {
        cy.get('button')
            .contains('New Survey')
            .should('have.length', 1)
            .click();

        cy.url()
            .should('match', /.*configuration\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));
                cy.url().should(
                    'eq',
                    `http://localhost:3000/configuration/${newSurveyName}`,
                );

                // use back button
                cy.go('back');
                cy.url().should('eq', 'http://localhost:3000/configurations');
                configListPanelIsWorking(newSurveyName);

                reloadConfigurations();
                configListPanelIsWorking(newSurveyName);
            });

        // survey will be remove by teardown: `after(...)`
    });

    it('removing a survey works', () => {
        cy.get('button')
            .contains('New Survey')
            .should('have.length', 1)
            .click();

        cy.url()
            .should('match', /.*configuration\/.+/)
            .then((url) => {
                const newSurveyName: any = last(url.split('/'));

                // revisit the page /configurations
                reloadConfigurations();
                configListPanelIsWorking(newSurveyName);

                cy.get(`@configListPanel-${newSurveyName}`)
                    .find('button > svg')
                    .should('have.length', 1)
                    .parents('button')
                    .click();

                cy.get(`@configListPanel-${newSurveyName}`)
                    .find('button:visible')
                    .contains('remove')
                    .should('have.length', 1)
                    .click();

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

                configListPanelIsWorking(newSurveyName);
                reloadConfigurations();
                configListPanelIsWorking(newSurveyName);

                cy.get(`@configListPanel-${newSurveyName}`)
                    .find('button > svg')
                    .should('have.length', 1)
                    .parents('button')
                    .click();

                cy.get(`@configListPanel-${newSurveyName}`)
                    .find('button:visible')
                    .contains('remove')
                    .should('have.length', 1)
                    .click();

                cy.get('button:visible')
                    .contains('remove survey')
                    .should('have.length', 1)
                    .click();

                // Remove modal is closed
                cy.get('h2')
                    .contains('Remove this survey permanently?')
                    .should('not.be.visible');

                // Success message is visible
                cy.get('div')
                    .contains('Success: Survey has been removed')
                    .should('have.length', 1);

                configListPanelIsAbsent(newSurveyName);
                reloadConfigurations();
                configListPanelIsAbsent(newSurveyName);
            });
    });

    it('duplicating a survey works', () => {
        // @ts-ignore
        cy.seedDuplicationData();
        reloadConfigurations();

        cy.fixture('configs.json').then((configsJSON: any) => {
            const originalSurvey = configsJSON.duplication.original;
            const originalSurveyName =
                configsJSON.duplication.original['survey_name'];
            const duplicateSurvey = configsJSON.duplication.duplicate;
            const duplicateSurveyName =
                configsJSON.duplication.duplicate['survey_name'];
            configListPanelIsWorking(originalSurvey['survey_name']);

            cy.get(`@configListPanel-${originalSurveyName}`)
                .find('button > svg')
                .should('have.length', 1)
                .parents('button')
                .click();

            cy.get(`@configListPanel-${originalSurveyName}`)
                .find('button:visible')
                .contains('duplicate')
                .should('have.length', 1)
                .click();

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
            cy.get('h2')
                .contains('Duplicate this survey?')
                .should('not.be.visible');

            configListPanelIsWorking(originalSurveyName);
            reloadConfigurations();
            configListPanelIsWorking(originalSurveyName);

            cy.get(`@configListPanel-${originalSurveyName}`)
                .find('button > svg')
                .should('have.length', 1)
                .parents('button')
                .click();

            cy.get(`@configListPanel-${originalSurveyName}`)
                .find('button:visible')
                .contains('duplicate')
                .should('have.length', 1)
                .click();

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
                .should('have.value', originalSurveyName);

            cy.get('@duplicateModal')
                .find('div')
                .contains(
                    `has to be unique, you already have a survey \'${originalSurveyName}\'`,
                )
                .should('have.length', 1);

            cy.get('@duplicateModal')
                .find('input')
                .clear()
                .type(duplicateSurveyName)
                .should('have.value', duplicateSurveyName);

            cy.get('@duplicateModal')
                .find('button')
                .contains('duplicate survey')
                .parents('button')
                .should('not.be.disabled')
                .click();

            // Duplicate modal has been closed
            cy.get('h2')
                .contains('Duplicate this survey?')
                .should('not.be.visible');

            // Success message is visible
            cy.get('div')
                .contains('Success: You are now viewing the created copy')
                .should('have.length', 1);

            cy.url().should(
                'eq',
                `http://localhost:3000/configuration/${duplicateSurveyName}`,
            );
            reloadConfigurations();
            configListPanelIsWorking(originalSurveyName);
            configListPanelIsWorking(duplicateSurveyName);

            cy.fixture('account.json').then((accountJSON: any) => {
                const authRequest = {
                    method: 'POST',
                    url: 'https://api.dev.fastsurvey.de/authentication',
                    body: {
                        identifier: accountJSON.username,
                        password: accountJSON.password,
                    },
                };
                const duplicationRequest = (
                    authResponse: Cypress.Response<any>,
                ) => ({
                    method: 'GET',
                    url: `https://api.dev.fastsurvey.de/users/${accountJSON.username}/surveys`,
                    headers: {
                        Authorization: `Bearer ${authResponse.body['access_token']}`,
                        'Content-Type': 'application/json',
                    },
                });
                cy.request(authRequest).then((authResponse) => {
                    expect(authResponse.status).to.equal(200);
                    cy.request(duplicationRequest(authResponse)).then(
                        (getResponse) => {
                            expect(getResponse.status).to.equal(200);
                            const duplicateSurveyOnServer = first(
                                getResponse.body.filter(
                                    (c: any) =>
                                        c['survey_name'] ===
                                        duplicateSurveyName,
                                ),
                            );
                            expect(duplicateSurveyOnServer).to.deep.equal(
                                duplicateSurvey,
                            );
                        },
                    );
                });
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
