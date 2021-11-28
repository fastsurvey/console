import * as utilities from '../../support/utilities';
import {types} from '/src/types';

const {login, getCySelector} = utilities;
const get = getCySelector;

const headerElements = {
    title: () => get(['summary-header', 'title'], {count: 1}),
    link: () => get(['summary-header', 'link-to-frontend'], {count: 1}),
    back: () => get(['summary-header', 'button-back'], {count: 1}),

    toggleDownloadDropdown: () =>
        get(['summary-header', 'button-toggle-download-dropdown'], {count: 1}),
    downloadDropdown: () => get(['summary-header', 'download-dropdown']),
    downloadJSON: () => get(['summary-header', 'button-download-json'], {count: 1}),
};

const field = (index: number) => ({
    container: () => get([`field-container-${index}`], {count: 1}),
    title: () => get([`field-container-${index}`, 'title'], {count: 1}),
    graphContainer: () =>
        get([`field-container-${index}`, 'graph-container'], {count: 1}),
    percentageBar: (optionIndex: number) =>
        get(
            [
                `field-container-${index}`,
                'graph-container',
                `percentage-bar-${optionIndex}`,
            ],
            {count: 1},
        ),
    percentageBarLabel: (optionIndex: number) =>
        get(
            [
                `field-container-${index}`,
                'graph-container',
                `percentage-bar-${optionIndex}`,
                `label`,
            ],
            {count: 1},
        ),
});

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

    it('initial submissions', () => {
        // TODO: check if all results panels contain the expected numbers
        // TODO: download JSON + check correctness
        // TODO (maybe): download CSV + check correctness
    });

    it('more submissions, refresh button', () => {
        // TODO: add submission to survey
        // TODO: expect values to have changed
        // TODO: download JSON + check correctness
    });
});
