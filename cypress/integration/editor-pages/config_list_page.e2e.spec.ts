import * as utilities from '../../support/utilities';

const {login, logout, reload} = utilities;

describe('The Config List Page', () => {
    // @ts-ignore
    //before(cy.seedConfigData);

    // @ts-ignore
    //after(cy.seedConfigData);

    before(() => {
        cy.fixture('account.json').then((accountJSON: any) => {
            login(accountJSON.username, accountJSON.password);
        });
    });

    // TODO: Test search bar

    it('seed surveys are present', () => {
        cy.get('a:visible').should('have.length', 4);

        cy.fixture('configs.json').then((configJSON: any) => {
            configJSON.surveysToKeep.forEach((s: string) => {
                cy.get('a:visible')
                    .contains(`dev.fastsurvey.de/blueberry/${s}`)
                    .should('have.length', 1)
                    .should('have.attr', 'href')
                    .and('eq', `https://dev.fastsurvey.de/blueberry/${s}`);

                cy.get('a:visible')
                    .contains(`dev.fastsurvey.de/blueberry/${s}`)
                    .parents('section')
                    .as(`configListPanel-${s}`);

                cy.get(`@configListPanel-${s}`)
                    .find('a:visible')
                    .contains('edit')
                    .parents('a')
                    .should('have.length', 1)
                    .should('have.attr', 'href')
                    .and('eq', `/configuration/${s}`);

                cy.get(`@configListPanel-${s}`).contains('edit').click();
                cy.url().should(
                    'eq',
                    `http://localhost:3000/configuration/${s}`,
                );
                cy.go('back');
                cy.url().should('eq', 'http://localhost:3000/configurations');
            });
        });
    });
});
