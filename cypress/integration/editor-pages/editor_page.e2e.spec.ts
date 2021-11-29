import {concat, first, pullAllBy, range} from 'lodash';
import * as utilities from '../../support/utilities';
import {types} from '/src/types';

const {login, getCySelector} = utilities;
const get = getCySelector;

const warningMessage = () => get(['message-panel-warning'], {count: 1});
const navbarButtonEditor = () => get(['navbar', 'button-editor'], {invisible: true});

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

const getFromField =
    (index: number, selectors: string[], props?: {count?: number; invisible?: true}) =>
    () =>
        get([`editor-field-panel-${index}`, ...selectors], props);

const fieldButtons = (index: number) => ({
    collapse: getFromField(index, ['button-collapse'], {count: 1}),
    copy: getFromField(index, ['button-copy'], {count: 1}),
    remove: getFromField(index, ['button-remove'], {count: 1}),
    addBefore: () => get([`add-field-before-${index}`], {count: 1}),
    pasteBefore: () => get([`paste-field-before-${index}`], {count: 1}),
});

const fieldInputs = (index: number) => ({
    title: getFromField(index, ['input-title'], {count: 1}),
    description: getFromField(index, ['input-description'], {count: 1}),
    regex: getFromField(index, ['input-regex'], {count: 1}),
    hint: getFromField(index, ['input-hint'], {count: 1}),
    toggleVerify: getFromField(index, ['toggle-verify'], {count: 1}),
    minChars: getFromField(index, ['input-min-chars'], {count: 1}),
    maxChars: getFromField(index, ['input-max-chars'], {count: 1}),
    optionList: getFromField(index, ['options-list'], {count: 1}),
    anyOptionInput: getFromField(index, ['options-list', 'input-option']),
    optionInput: (optionIndex: number) =>
        get([
            `editor-field-panel-${index}`,
            'options-list',
            `input-option-${optionIndex}`,
        ]),
    addOption: getFromField(index, ['options-list', 'button-add'], {count: 1}),
    minSelect: getFromField(index, ['input-min-select'], {count: 1}),
    maxSelect: getFromField(index, ['input-max-select'], {count: 1}),
});

const getFromPopup = (selectors: string[], props?: {count?: number}) =>
    get(['popup-panel', ...selectors]);
const addFieldPopup = {
    panel: () => get(['popup-panel'], {count: 1, invisible: true}),
    cancelAdd: () => getFromPopup(['button-cancel-add'], {count: 1}),
    submitAdd: () => getFromPopup(['button-submit-add'], {count: 1}),
    selectField: (fieldType: types.FieldType) =>
        getFromPopup([`button-select-${fieldType}`], {count: 1}),
    activeSelect: () => getFromPopup([`isactive`]),
};

function insertInArray(array: any[], index: number, element: any) {
    return concat(array.slice(0, index), element, array.slice(index, array.length));
}

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
        fieldInputs(index).title().should('have.value', fieldConfig.title);
        fieldInputs(index).description().should('have.value', fieldConfig.description);
    };

    const assertEditorPath = (survey_name: string) =>
        cy.url().should('eq', `http://localhost:3000/configuration/${survey_name}`);

    const assertSyncedHeaderState = () => {
        get(['editor-header', 'button-undo']).should('have.length', 0);
        get(['editor-header', 'button-save']).should('have.length', 0);
        headerElements.reopen().should('not.be.disabled');
        get(['message-panel-warning']).should('have.length', 0);
        get(['message-panel-error']).should('have.length', 0);
    };

    const assertConfigInDB = (
        username: string,
        password: string,
        surveyConfig: types.SurveyConfig,
    ) => {
        // deepCompare the config-json in database
        cy.request({
            method: 'POST',
            url: 'https://api.dev.fastsurvey.de/authentication',
            body: {
                identifier: username,
                password: password,
            },
        }).then((authResponse) => {
            expect(authResponse.status).to.equal(200);
            cy.request({
                method: 'GET',
                url: `https://api.dev.fastsurvey.de/users/${username}/surveys`,
                headers: {
                    Authorization: `Bearer ${authResponse.body['access_token']}`,
                    'Content-Type': 'application/json',
                },
            }).then((getResponse) => {
                expect(getResponse.status).to.equal(200);
                const duplicateSurveyOnServer = first(
                    getResponse.body.filter(
                        (c: any) => c['survey_name'] === surveyConfig['survey_name'],
                    ),
                );
                console.log({duplicateSurveyOnServer, surveyConfig});
                expect(duplicateSurveyOnServer).to.deep.equal(surveyConfig);
            });
        });
    };

    it('header look, back button, settings look, tab navigation', function () {
        headerElements.title();
        headerElements.link();
        headerElements.reopen();

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

        headerElements.back().click();
        cy.url().should('eq', 'http://localhost:3000/configurations');
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

        // assert initial state
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

        [0, 1, 2].map((i) => fieldButtons(i).collapse().click());
        assertSurveyState(INITIAL_SURVEY);

        settingsElements
            .inputTitle()
            .clear()
            .type(MODIFIED_SURVEY.title)
            .should('have.value', MODIFIED_SURVEY.title);

        cy.reload();
        [0, 1, 2].map((i) => fieldButtons(i).collapse().click());
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
        [0, 1, 2].map((i) => fieldButtons(i).collapse().click());

        // assert the correct order
        expect(INITIAL_SURVEY.fields[0].type).to.equal('text');
        expect(INITIAL_SURVEY.fields[1].type).to.equal('email');
        expect(INITIAL_SURVEY.fields[2].type).to.equal('selection');

        MODIFIED_SURVEY.fields.forEach(
            (newFieldConfig: types.SurveyField, i: number) => {
                fieldInputs(i).title().clear().type(newFieldConfig.title);
                fieldInputs(i).description().clear().type(newFieldConfig.description);
                assertFieldState(newFieldConfig, i);
            },
        );

        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);

        cy.reload();
        [0, 1, 2].map((i) => fieldButtons(i).collapse().click());
        assertSurveyState(INITIAL_SURVEY);

        // Whether a change in fields is made to the title, the description or
        // any other parameter, is transparent to the editor -> therefore the
        // other parameters can be tested with component testing on single fields
    });

    it('copy and paste', function () {
        const {INITIAL_SURVEY, COPY_PASTE_SURVEY} = this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const copyPasteSequence = () => {
            fieldButtons(0).copy().click();
            fieldButtons(3).pasteBefore().click();
            fieldButtons(2).copy().click();
            fieldButtons(0).pasteBefore().click();
            fieldButtons(2).copy().click();
            fieldButtons(3).pasteBefore().click();
        };

        // undo works
        copyPasteSequence();
        range(6).map((i) => fieldButtons(i).collapse().click());
        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);
        cy.reload();
        range(3).map((i) => fieldButtons(i).collapse().click());
        assertSurveyState(INITIAL_SURVEY);
        range(3).map((i) => fieldButtons(i).collapse().click());

        // save works
        copyPasteSequence();
        range(6).map((i) => fieldButtons(i).collapse().click());
        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.save().click();
        assertSurveyState(COPY_PASTE_SURVEY);
        cy.reload();
        range(6).map((i) => fieldButtons(i).collapse().click());
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

    it('page switch not possible with unsaved changes', function () {
        const {INITIAL_SURVEY} = this.configsJSON.EDITOR;
        const survey_name = INITIAL_SURVEY.survey_name;

        assertEditorPath(survey_name);
        settingsElements.inputTitle().clear();
        headerElements.undo();
        headerElements.save();

        headerElements.back().click();
        assertEditorPath(survey_name);
        warningMessage().contains('save or undo');

        cy.reload();
        assertEditorPath(survey_name);
        settingsElements.inputTitle().clear();
        navbarButtonEditor().click({force: true});
        assertEditorPath(survey_name);
        warningMessage().contains('save or undo');
    });

    it('save not possible with invalid fields', () => {
        const assertInvalidFieldState = () => {
            headerElements.reopen().should('be.disabled');
            headerElements.save().click();
            warningMessage().contains('Invalid fields');
            headerElements.undo().click();
            headerElements.reopen().should('not.be.disabled');
        };
        settingsElements.inputTitle().clear();
        assertInvalidFieldState();

        fieldButtons(0).collapse().click();
        fieldInputs(0).title().clear();
        assertInvalidFieldState();

        fieldButtons(2).collapse().click();
        fieldInputs(2).title().clear();
        assertInvalidFieldState();
    });

    it('add field popup', function () {
        addFieldPopup.panel().should('not.be.visible');
        fieldButtons(0).addBefore().click();
        addFieldPopup.panel().should('be.visible');
        addFieldPopup.cancelAdd().click();
        addFieldPopup.panel().should('not.be.visible');

        fieldButtons(2).addBefore().click();
        addFieldPopup.panel().should('be.visible');
        addFieldPopup.activeSelect().should('have.length', 0);
        ['email', 'text', 'selection'].forEach((fieldType: any) => {
            addFieldPopup
                .selectField(fieldType)
                .click()
                .should('have.attr', 'data-cy')
                .and('contain', 'isactive');
            addFieldPopup.submitAdd().should('not.be.disabled');
            addFieldPopup
                .selectField(fieldType)
                .click()
                .should('have.attr', 'data-cy')
                .and('contain', 'isinactive');
            addFieldPopup.submitAdd().should('be.disabled');
        });
        addFieldPopup.cancelAdd().click();
        addFieldPopup.panel().should('not.be.visible');
    });

    it('adding a text field, undo adding', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const assertLocalField = (index: number) => {
            fieldInputs(index).description().should('be.empty');
            fieldInputs(index).minChars().should('have.value', '0');
            fieldInputs(index).maxChars().should('have.value', '2000');
        };

        // add text field at index 0
        fieldButtons(0).addBefore().click();
        addFieldPopup.selectField('text').click();
        addFieldPopup.submitAdd().click();
        fieldButtons(0).collapse().click();

        // assert intial state after adding
        fieldInputs(0).title().should('be.empty');
        assertLocalField(0);

        // undo and assert state after save
        headerElements.undo().click();
        assertSyncedHeaderState();
        get([`editor-field-panel`], {count: 3});
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
        });

        // edit field to match fixture
        fieldButtons(1).addBefore().click();
        addFieldPopup.selectField('text').click();
        addFieldPopup.submitAdd().click();
        fieldButtons(1).collapse().click();
        fieldInputs(1).title().type(ADDED_FIELDS.TEXT.title);

        // save and assert state after save
        headerElements.save().click();
        assertSyncedHeaderState();
        fieldInputs(1).title().should('have.value', ADDED_FIELDS.TEXT.title);
        assertLocalField(1);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 1, ADDED_FIELDS.TEXT),
        });
    });

    it('adding an email field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const assertLocalField = () => {
            fieldInputs(2).description().should('be.empty');
            fieldInputs(2).regex().should('have.value', '.*');
            fieldInputs(2).hint().should('have.value', 'Any email address');
            fieldInputs(2)
                .toggleVerify()
                .find('[data-cy*="no"]')
                .should('have.attr', 'data-cy')
                .and('contain', 'isactive');
        };

        // add text field at index 2
        fieldButtons(2).addBefore().click();
        addFieldPopup.selectField('email').click();
        addFieldPopup.submitAdd().click();
        fieldButtons(2).collapse().click();

        // assert intial state after adding
        fieldInputs(2).title().should('be.empty');
        assertLocalField();

        // edit field to match fixture
        fieldInputs(2).title().type(ADDED_FIELDS.EMAIL.title);

        // save and assert state after save
        headerElements.save().click();
        assertSyncedHeaderState();
        fieldInputs(2).title().should('have.value', ADDED_FIELDS.EMAIL.title);
        assertLocalField();
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 2, ADDED_FIELDS.EMAIL),
        });
    });

    it('adding a selection field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        // add selection field at index 3
        fieldButtons(3).addBefore().click();
        addFieldPopup.selectField('selection').click();
        addFieldPopup.submitAdd().click();
        fieldButtons(3).collapse().click();
        fieldInputs(3).title().should('be.empty');
        fieldInputs(3).description().should('be.empty');
        fieldInputs(3).anyOptionInput().should('have.length', 0);
        fieldInputs(3).minSelect().should('have.value', '0');
        fieldInputs(3).maxSelect().should('have.value', '0');

        // edit field to match fixture
        fieldInputs(3).title().type(ADDED_FIELDS.SELECTION.title);
        ADDED_FIELDS.SELECTION.options.forEach((o: string, i: number) => {
            fieldInputs(3).addOption().click();
            fieldInputs(3).optionInput(i).type(o);
        });
        fieldInputs(3).maxSelect().type(ADDED_FIELDS.SELECTION.max_select);

        // change max-select
        headerElements.save().click();

        // save and assert state after save
        assertSyncedHeaderState();
        fieldInputs(3).title().should('have.value', ADDED_FIELDS.SELECTION.title);
        fieldInputs(3).anyOptionInput().should('have.length', 2);
        ADDED_FIELDS.SELECTION.options.forEach((o: string, i: number) => {
            fieldInputs(3).optionInput(i).should('have.value', o);
        });
        fieldInputs(3)
            .maxSelect()
            .should('have.value', ADDED_FIELDS.SELECTION.max_select);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 3, ADDED_FIELDS.SELECTION),
        });
    });

    it('removing a field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER} = this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        // TODO: Wait for Felix to fix bug with max_identifier

        // remove field 1 + undo
        fieldButtons(1).remove().click();
        get([`editor-field-panel`], {count: 2});
        headerElements.undo().click();
        get([`editor-field-panel`], {count: 3});
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
        });

        // remove field 2 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate1');

        fieldButtons(2).remove().click();
        get([`editor-field-panel`], {count: 2});
        headerElements.save().click();
        get([`editor-field-panel`], {count: 2});
        headerElements.reopen().should('not.be.disabled');

        cy.wait(['@PUTupdate1']);
        console.log({INITIAL_SURVEY});

        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: pullAllBy(
                JSON.parse(JSON.stringify(INITIAL_SURVEY.fields)),
                [{identifier: INITIAL_SURVEY.fields[2].identifier}],
                'identifier',
            ),
        });

        // remove field 0 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate2');

        fieldButtons(0).remove().click();
        get([`editor-field-panel`], {count: 1});
        headerElements.save().click();
        get([`editor-field-panel`], {count: 1});

        cy.wait(['@PUTupdate2']);

        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: pullAllBy(
                JSON.parse(JSON.stringify(INITIAL_SURVEY.fields)),
                [
                    {identifier: INITIAL_SURVEY.fields[2].identifier},
                    {identifier: INITIAL_SURVEY.fields[0].identifier},
                ],
                'identifier',
            ),
        });

        // remove last field + save (unsuccessful)
        fieldButtons(0).remove().click();
        get([`editor-field-panel`], {count: 0});
        headerElements.save().click();
        get([`editor-field-panel`], {count: 0});
        warningMessage().contains('at least one field');
        headerElements.undo().click();
        get([`editor-field-panel`], {count: 1});
        assertSyncedHeaderState();
    });

    // Test with component test of fields:
    // TODO: looks as expected
    // TODO: collapsing fields
    // TODO: all possible error messages
});
