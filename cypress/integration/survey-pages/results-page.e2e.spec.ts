import path from 'path';
import {sortBy} from 'lodash';
import {login, getCySelector} from '../../support/utilities';
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
    description: () => get([`field-container-${index}`, 'description'], {count: 1}),
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
    beforeEach(() => {
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
                .description()
                .should(
                    'contain.text',
                    `${fieldIndex + 1}. ${FIELDS[fieldIndex].description}`,
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

    it('header, config list', function () {
        const {USERNAME} = this.accountJSON;
        const {SURVEY} = this.configsJSON.RESULTS;
        const SURVEY_NAME = SURVEY['survey_name'];
        headerElements.title().should('have.text', SURVEY.title);
        headerElements
            .link()
            .should('have.text', `dev.fastsurvey.de/${USERNAME}/${SURVEY_NAME}`);
        headerElements
            .link()
            .should('have.attr', 'href')
            .and('eq', `https://dev.fastsurvey.de/${USERNAME}/${SURVEY_NAME}`);

        headerElements.downloadDropdown().should('have.length', 0);
        headerElements.toggleDownloadDropdown().click();
        headerElements.downloadDropdown().should('have.length', 1);
        headerElements.downloadJSON();
        headerElements.downloadCSV();
        headerElements.toggleDownloadDropdown().click();
        headerElements.downloadDropdown().should('have.length', 0);

        // back button
        cy.url().should('contains', `/results/${SURVEY_NAME}`);
        headerElements.back().click();
        cy.url().should('contains', '/surveys');
    });

    it('initial submissions, more submissions, refresh button', function () {
        const {RESULTS} = this.configsJSON;
        assertSummaryState(RESULTS.INITIAL_SUMMARY, RESULTS.SURVEY.fields);

        // @ts-ignore
        cy.seedUpdatedResultsData();

        cy.wait(3000).then(() => {
            headerElements.refresh().click();
            assertSummaryState(RESULTS.UPDATED_SUMMARY, RESULTS.SURVEY.fields);
        });
    });

    it('download JSON', function () {
        const {USERNAME} = this.accountJSON;
        const {SURVEY, INITIAL_DOWNLOAD} = this.configsJSON.RESULTS;

        cy.wait(3000).then(() => {
            headerElements.toggleDownloadDropdown().click();
            headerElements.downloadJSON().click();

            const downloadsFolder = Cypress.config('downloadsFolder');
            const filename = path.join(
                downloadsFolder,
                `${USERNAME}_${SURVEY['survey_name']}_submissions.json`,
            );

            const sortSubmissions = (xs: any[]) => {
                cy.log(JSON.stringify({xs}));
                return sortBy(
                    xs,
                    (x) => x["What's your email address?"]['email_address'],
                );
            };
            cy.readFile(filename, 'utf8').then((fileContent) => {
                expect(
                    sortSubmissions(fileContent.map((s: any) => s.submission)),
                ).to.deep.equal(sortSubmissions(INITIAL_DOWNLOAD));
            });
        });
    });
});
