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
    downloadDropdown: () => get(['summary-header', 'download-dropdown-panel']),
    downloadJSON: () => get(['summary-header', 'button-download-json'], {count: 1}),
    downloadCSV: () => get(['summary-header', 'button-download-csv'], {count: 1}),
    refresh: () => get(['summary-header', 'button-refresh'], {count: 1}),
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

const resultsPanel = (surveyName: string) => ({
    container: () => get([`results-panel-${surveyName}`], {count: 1}),
    title: () => get([`results-panel-${surveyName}`, 'title'], {count: 1}),
    linkToFrontend: () =>
        get([`results-panel-${surveyName}`, 'link-to-frontend'], {count: 1}),
    linkToSummary: () =>
        get([`results-panel-${surveyName}`, 'link-to-summary'], {count: 1}),
});

describe('The Results Summary Page', () => {
    before(() => {
        // @ts-ignore
        cy.seedConfigData();

        // @ts-ignore
        cy.seedResultsData();
    });

    beforeEach(() => {
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

    const assertSummaryState = (
        SUMMARY: (null | {
            total: number;
            results: {[key: string]: number};
        })[],
        FIELDS: any,
    ) => {
        SUMMARY.forEach((fieldSummary, fieldIndex) => {
            field(fieldIndex).container();
            field(fieldIndex)
                .title()
                .should(
                    'contain.text',
                    `${fieldIndex + 1}. ${FIELDS[fieldIndex].title}`,
                );
            field(fieldIndex)
                .container()
                .should('have.attr', 'data-cy')
                .and(
                    'contain',
                    fieldSummary === null ? 'isnotaggregated' : 'isaggregated',
                );

            if (fieldSummary !== null) {
                // @ts-ignore
                const fieldConfig: {options: string[]} = FIELDS[fieldIndex];
                fieldConfig.options.forEach((optionTitle, optionIndex) => {
                    field(fieldIndex)
                        .percentageBar(optionIndex)
                        .should('have.attr', 'data-cy')
                        .and(
                            'contain',
                            `count-${fieldSummary.results[optionTitle]}-${fieldSummary.total}-`,
                        );
                    field(fieldIndex)
                        .percentageBarLabel(optionIndex)
                        .should('contain.text', optionTitle);
                });
            }
        });

        // not more fields that expected
        get([`field-container-${SUMMARY.length}`], {count: 0});
    };

    it('header', function () {
        const {USERNAME} = this.accountJSON;
        const {SURVEY} = this.configsJSON.RESULTS;
        headerElements.title().should('have.text', SURVEY.title);
        headerElements
            .link()
            .should(
                'have.text',
                `dev.fastsurvey.de/${USERNAME}/${SURVEY['survey_name']}`,
            );
        headerElements
            .link()
            .should('have.attr', 'href')
            .and(
                'eq',
                `https://dev.fastsurvey.de/${USERNAME}/${SURVEY['survey_name']}`,
            );

        headerElements.downloadDropdown().should('have.length', 0);
        headerElements.toggleDownloadDropdown().click();
        headerElements.downloadDropdown().should('have.length', 1);
        headerElements.downloadJSON();
        headerElements.downloadCSV();
        headerElements.toggleDownloadDropdown().click();
        headerElements.downloadDropdown().should('have.length', 0);
    });

    it('results-list', function () {
        const {USERNAME} = this.accountJSON;
        const {SURVEY} = this.configsJSON.RESULTS;

        const SURVEY_NAME = SURVEY['survey_name'];

        cy.url().should('eq', `http://localhost:3000/results/${SURVEY_NAME}`);
        headerElements.back().click();
        cy.url().should('eq', 'http://localhost:3000/results');

        resultsPanel(SURVEY_NAME).title().should('have.text', SURVEY.title);
        resultsPanel(SURVEY_NAME)
            .linkToFrontend()
            .should('have.text', `dev.fastsurvey.de/${USERNAME}/${SURVEY_NAME}`);
        resultsPanel(SURVEY_NAME)
            .linkToFrontend()
            .should('have.attr', 'href')
            .and('eq', `https://dev.fastsurvey.de/${USERNAME}/${SURVEY_NAME}`);
        resultsPanel(SURVEY_NAME).linkToSummary().click();

        cy.url().should('eq', `http://localhost:3000/results/${SURVEY_NAME}`);
    });

    it('initial submissions', function () {
        const {RESULTS} = this.configsJSON;
        assertSummaryState(RESULTS.INITIAL_SUMMARY, RESULTS.SURVEY.fields);

        // TODO: download JSON + check correctness
    });

    it('more submissions, refresh button', function () {
        const {RESULTS} = this.configsJSON;
        assertSummaryState(RESULTS.INITIAL_SUMMARY, RESULTS.SURVEY.fields);

        // @ts-ignore
        cy.seedUpdatedResultsData();

        cy.wait(3000).then(() => {
            headerElements.refresh().click();
            assertSummaryState(RESULTS.UPDATED_SUMMARY, RESULTS.SURVEY.fields);
        });

        // TODO: download JSON + check correctness
    });
});
