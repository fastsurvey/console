import {first, range} from 'lodash';
import * as utilities from '../../support/utilities';
import {types} from '/src/types';

const {login, getCySelector} = utilities;
const get = getCySelector;

const headerElements = {
    title: () => get(['editor-header', 'title'], {count: 1}),
    link: () => get(['editor-header', 'link-to-frontend'], {count: 1}),
    pill: () => get(['editor-header', 'time-pill'], {count: 1}),
    back: () => get(['editor-header', 'button-back'], {count: 1}),

    undo: () => get(['editor-header', 'button-undo'], {count: 1}),
    save: () => get(['editor-header', 'button-save'], {count: 1}),
    publish: () => get(['editor-header', 'button-publish'], {count: 1}),
    start: () => get(['editor-header', 'button-start'], {count: 1}),
    end: () => get(['editor-header', 'button-end'], {count: 1}),
    reopen: () => get(['editor-header', 'button-reopen'], {count: 1}),
};

const settingsElements = {
    tabAbout: () => get(['editor-settings', 'tab-about'], {count: 1}),
    tabVisibility: () => get(['editor-settings', 'tab-visibility'], {count: 1}),

    inputTitle: () => get(['editor-settings', 'input-title'], {count: 1}),
    inputIdentifier: () => get(['editor-settings', 'input-identifier'], {count: 1}),
    refreshIdentifier: () => get(['editor-settings', 'refresh-identifier'], {count: 1}),
    inputDescription: () => get(['editor-settings', 'input-description'], {count: 1}),

    toggleDraftYes: () => get(['editor-settings', 'toggle-draft', 'yes'], {count: 1}),
    toggleDraftNo: () => get(['editor-settings', 'toggle-draft', 'no'], {count: 1}),

    startDate: () => get(['editor-settings', 'datepicker-start'], {count: 1}),
    startTime: () => get(['editor-settings', 'timepicker-start'], {count: 1}),
    endDate: () => get(['editor-settings', 'datepicker-end'], {count: 1}),
    endTime: () => get(['editor-settings', 'timepicker-end'], {count: 1}),
};

const fieldElements = {
    collapse: (index: number) =>
        getCySelector([`editor-field-panel-${index}`, 'button-collapse'], {count: 1}),
    copy: (index: number) =>
        getCySelector([`editor-field-panel-${index}`, 'button-copy'], {count: 1}),
    remove: (index: number) =>
        getCySelector([`editor-field-panel-${index}`, 'button-remove'], {count: 1}),
    title: (index: number) =>
        getCySelector([`editor-field-panel-${index}`, 'input-title'], {count: 1}),
    description: (index: number) =>
        getCySelector([`editor-field-panel-${index}`, 'input-description'], {count: 1}),
    addBefore: (index: number) =>
        getCySelector([`add-field-before-${index}`], {count: 1}),
    pasteBefore: (index: number) =>
        getCySelector([`paste-field-before-${index}`], {count: 1}),
};

describe('The Editor Page', () => {
    beforeEach(() => {
        // @ts-ignore
        cy.seedConfigData();

        // @ts-ignore
        cy.seedEditorData();

        cy.fixture('account.json')
            .as('accountJSON')
            .then((accountJSON) => {
                login(accountJSON.USERNAME, accountJSON.PASSWORD);
                cy.fixture('configs.json')
                    .as('configsJSON')
                    .then((configsJSON) => {
                        const s = configsJSON.EDITOR.INITIAL_SURVEY['survey_name'];
                        cy.visit(`/configuration/${s}`);
                    });
            });
    });

    const assertPillState = (state: 'draft' | 'pending' | 'running' | 'finished') => {
        headerElements.pill().should('have.attr', 'data-cy').and('contain', state);
        headerElements
            .link()
            .should('have.attr', 'data-cy')
            .and('contains', state === 'draft' ? 'isinactive' : 'isactive');
    };

    const assertSurveyState = (surveyConfig: types.SurveyConfig) => {
        settingsElements.inputTitle().should('have.value', surveyConfig.title);
        settingsElements
            .inputIdentifier()
            .should('have.value', surveyConfig.survey_name);
        settingsElements
            .inputDescription()
            .should('have.value', surveyConfig.description);

        surveyConfig.fields.forEach((fieldConfig, i) => {
            assertFieldState(fieldConfig, i);
        });
    };

    const assertFieldState = (fieldConfig: types.SurveyField, index: number) => {
        fieldElements.title(index).should('have.value', fieldConfig.title);
        fieldElements.description(index).should('have.value', fieldConfig.description);
    };

    /*it('header look, back button', function () {
        headerElements.title();
        headerElements.link();
        headerElements.reopen();

        headerElements.back().click();
        cy.url().should('eq', 'http://localhost:3000/configurations');
    });

    it('settings look, tab navigation', function () {
        settingsElements.tabAbout();
        settingsElements.inputTitle();
        settingsElements.inputIdentifier();
        settingsElements.inputDescription();

        settingsElements.tabVisibility().click();
        settingsElements.toggleDraftYes();
        settingsElements.toggleDraftNo();
        settingsElements.startDate();
        settingsElements.startTime();
        settingsElements.endDate();
        settingsElements.endTime();
    });

    it('start/end buttons', function () {
        // assert initial state
        assertPillState('finished');

        // reopen survey
        headerElements.reopen().click();
        headerElements.end();
        assertPillState('running');
        cy.reload();
        assertPillState('running');

        // close survey again
        headerElements.end().click();
        headerElements.reopen();
        assertPillState('finished');
    });

    it('draft toggle', function () {
        // assert initial state
        assertPillState('finished');
        settingsElements.tabVisibility().click();
        settingsElements
            .toggleDraftYes()
            .should('have.attr', 'data-cy')
            .and('contain', 'isactive');

        // switch to draft=true but don't save
        settingsElements.toggleDraftNo().click();
        assertPillState('draft');
        headerElements.save();
        headerElements.undo().click();
        assertPillState('finished');
        cy.reload();
        settingsElements.tabVisibility().click();
        assertPillState('finished');

        // switch to draft=true and save
        settingsElements.toggleDraftNo().click();
        headerElements.save().click();
        assertPillState('draft');
        cy.reload();
        settingsElements.tabVisibility().click();
        assertPillState('draft');
    });

    it('changing a survey name', function () {
        const {INITIAL_SURVEY, TMP_SURVEY_NAME} = this.configsJSON.EDITOR;
        const SURVEY_NAME = INITIAL_SURVEY.survey_name;

        // initial state
        settingsElements.inputIdentifier().should('have.value', SURVEY_NAME);
        cy.url().should('eq', `http://localhost:3000/configuration/${SURVEY_NAME}`);

        // refresh button
        settingsElements.refreshIdentifier().click();
        settingsElements.inputIdentifier().should('not.have.value', SURVEY_NAME);
        headerElements.save();

        // changing survey name
        settingsElements.inputIdentifier().clear().type(TMP_SURVEY_NAME);
        headerElements.save().click();
        cy.url().should('eq', `http://localhost:3000/configuration/${TMP_SURVEY_NAME}`);
        cy.reload();
        settingsElements.inputIdentifier().should('have.value', TMP_SURVEY_NAME);
        cy.url().should('eq', `http://localhost:3000/configuration/${TMP_SURVEY_NAME}`);

        // changing it back
        settingsElements.inputIdentifier().clear().type(SURVEY_NAME);
        headerElements.save().click();
        cy.url().should('eq', `http://localhost:3000/configuration/${SURVEY_NAME}`);
        cy.reload();
        settingsElements.inputIdentifier().should('have.value', SURVEY_NAME);
        cy.url().should('eq', `http://localhost:3000/configuration/${SURVEY_NAME}`);
    });

    it('fields from fixture are present, undo functionality', function () {
        const {INITIAL_SURVEY, MODIFIED_SURVEY} = this.configsJSON.EDITOR;

        [0, 1, 2].map((i) => fieldElements.collapse(i).click());
        assertSurveyState(INITIAL_SURVEY);

        settingsElements
            .inputTitle()
            .clear()
            .type(MODIFIED_SURVEY.title)
            .should('have.value', MODIFIED_SURVEY.title);

        cy.reload();
        [0, 1, 2].map((i) => fieldElements.collapse(i).click());
        assertSurveyState(INITIAL_SURVEY);

        settingsElements
            .inputIdentifier()
            .clear()
            .type(MODIFIED_SURVEY.survey_name)
            .should('have.value', MODIFIED_SURVEY.survey_name);
        settingsElements
            .inputDescription()
            .clear()
            .type(MODIFIED_SURVEY.description)
            .should('have.value', MODIFIED_SURVEY.description);

        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);

        cy.reload();
        [0, 1, 2].map((i) => fieldElements.collapse(i).click());

        // assert the correct order
        expect(INITIAL_SURVEY.fields[0].type).to.equal('text');
        expect(INITIAL_SURVEY.fields[1].type).to.equal('email');
        expect(INITIAL_SURVEY.fields[2].type).to.equal('selection');

        MODIFIED_SURVEY.fields.forEach(
            (newFieldConfig: types.SurveyField, i: number) => {
                fieldElements.title(i).clear().type(newFieldConfig.title);
                fieldElements.description(i).clear().type(newFieldConfig.description);
                assertFieldState(newFieldConfig, i);
            },
        );

        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);

        cy.reload();
        [0, 1, 2].map((i) => fieldElements.collapse(i).click());
        assertSurveyState(INITIAL_SURVEY);

        // Whether a change in fields is made to the title, the description or
        // any other parameter, is transparent to the editor -> therefore the
        // other parameters can be tested with component testing on single fields
    });*/

    it('copy and paste', function () {
        const {INITIAL_SURVEY, COPY_PASTE_SURVEY} = this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const copyPasteSequence = () => {
            fieldElements.copy(0).click();
            fieldElements.pasteBefore(3).click();
            fieldElements.copy(2).click();
            fieldElements.pasteBefore(0).click();
            fieldElements.copy(2).click();
            fieldElements.pasteBefore(3).click();
        };

        // undo works
        copyPasteSequence();
        range(6).map((i) => fieldElements.collapse(i).click());
        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);
        cy.reload();
        range(3).map((i) => fieldElements.collapse(i).click());
        assertSurveyState(INITIAL_SURVEY);
        range(3).map((i) => fieldElements.collapse(i).click());

        // save works
        copyPasteSequence();
        range(6).map((i) => fieldElements.collapse(i).click());
        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.save().click();
        assertSurveyState(COPY_PASTE_SURVEY);
        cy.reload();
        range(6).map((i) => fieldElements.collapse(i).click());
        assertSurveyState(COPY_PASTE_SURVEY);

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
                        (c: any) => c['survey_name'] === COPY_PASTE_SURVEY.survey_name,
                    ),
                );
                expect(duplicateSurveyOnServer).to.deep.equal(COPY_PASTE_SURVEY);
            });
        });
    });

    // TODO: add an email field
    // TODO: add a text field
    // TODO: add a selection field

    // TODO: remove a field (add a seed field before that with the UI)

    // TODO: save not possible when any field is invalid (just test this using empty titles)
    it('save not possible with invalid fields', () => {});

    // Test with component test of fields:
    // - looks as expected
    // - collapsing fields
    // - all possible error messages
});
