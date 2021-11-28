import * as utilities from '../../support/utilities';
import {types} from '/src/types';

const {login, getCySelector} = utilities;

describe('The Results Summary Page', () => {
    before(() => {
        // @ts-ignore
        cy.seedConfigData();

        // @ts-ignore
        cy.seedResultsData();

        cy.fixture('account.json')
            .as('accountJSON')
            .then((accountJSON) => {
                login(accountJSON.USERNAME, accountJSON.PASSWORD);
                cy.fixture('configs.json')
                    .as('configsJSON')
                    .then((configsJSON) => {
                        const s = configsJSON.RESULTS.SURVEY['survey_name'];
                        cy.visit(`/results/${s}`);
                    });
            });
    });

    it('does something', () => {});

    // TODO: seed with sample survey
    //
    // TODO: check if all results panels contain the expected numbers
    // TODO: download JSON + check correctness
    // TODO (maybe): download CSV + check correctness
    //
    // TODO: add submission to survey
    // TODO: expect values to have changed
    // TODO: download JSON + check correctness
    // TODO (maybe): download CSV + check correctness
    //
});
