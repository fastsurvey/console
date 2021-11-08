import {last} from 'lodash';
import * as utilities from '../../support/utilities';

const {login, logout, reload} = utilities;

function configListPanelIsWorking(surveyName: string) {
    cy.fixture('account.json').then((accountJSON) => {
        cy.get('div', {timeout: 10000})
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

    // TODO: test "create survey"
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

                // revisit the page /configurations
                cy.reload();
                configListPanelIsWorking(newSurveyName);
            });
    });

    // TODO: test "duplicate survey"
    // TODO: test "remove survey"

    // TODO: Test search bar
});
