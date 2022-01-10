import {concat, first, range} from 'lodash';
import {types} from '/src/types';
import {login, getCySelector, assertDataCy} from '../../support/utilities';
const get = getCySelector;

const warningMessage = () => get(['message-panel-warning'], {count: 1});
const navbarButtonSurveys = () => get(['navbar', 'button-surveys'], {invisible: true});

const headerElements = {
    title: () => get(['editor-header', 'title'], {count: 1}),
    link: () => get(['editor-header', 'link-to-frontend'], {count: 1}),
    pill: () => get(['editor-header', 'time-pill'], {count: 1}),
    back: () => get(['editor-header', 'button-back'], {count: 1}),

    undo: () => get(['editor-header', 'button-undo'], {count: 1}),
    save: () => get(['editor-header', 'button-save'], {count: 1}),
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

    startDate: () => get(['editor-settings', 'datepicker-start'], {count: 1}),
    endDate: () => get(['editor-settings', 'datepicker-end'], {count: 1}),
};

const getFromField =
    (index: number, selectors: string[], props?: {count?: number; invisible?: true}) =>
    () =>
        get([`editor-field-panel-${index} `, ...selectors], props);

const fieldElements = (index: number) => ({
    panel: getFromField(index, [], {count: 1}),
    buttons: {
        collapse: getFromField(index, ['button-collapse'], {count: 1}),
        copy: getFromField(index, ['button-copy'], {count: 1}),
        remove: getFromField(index, ['button-remove'], {count: 1}),
        addBefore: () => get([`add-field-before-${index}`], {count: 1}),
        pasteBefore: () => get([`paste-field-before-${index}`], {count: 1}),
    },
    inputs: {
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
    },
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
                        cy.visit(`/editor/${s}`);
                    });
            });
    });

    const assertPillState = (state: 'pending' | 'running' | 'finished') => {
        headerElements.pill().should('have.attr', 'data-cy').and('contain', state);
    };

    const assertSurveyState = (surveyConfig: types.SurveyConfig) => {
        settingsElements.inputTitle().should('have.value', surveyConfig.title);
        settingsElements
            .inputIdentifier()
            .should('have.value', surveyConfig.survey_name);

        surveyConfig.fields.forEach((fieldConfig, i) => {
            assertFieldState(fieldConfig, i);
        });
    };

    const assertFieldState = (fieldConfig: types.SurveyField, index: number) => {
        if (fieldConfig.type !== 'break') {
            fieldElements(index)
                .inputs.description()
                .should('have.value', fieldConfig.description);
        }
    };

    const assertEditorPath = (survey_name: string) =>
        cy.url().should('contains', `/editor/${survey_name}`);

    const assertHeaderState = (state: 'synced' | 'unsynced') => {
        headerElements.end().should((state === 'synced' ? 'not.' : '') + 'be.disabled');
        headerElements
            .undo()
            .should((state === 'unsynced' ? 'not.' : '') + 'be.disabled');
        headerElements
            .save()
            .should((state === 'unsynced' ? 'not.' : '') + 'be.disabled');
    };

    const assertFieldCollapseState = (
        index: number,
        state: 'iscollapsed' | 'isnotcollapsed',
    ) => {
        assertDataCy(fieldElements(index).panel(), state);
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

    it('removing a field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER} = this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        // remove field 1 + undo
        fieldElements(1).buttons.remove().click();
        get([`editor-field-panel`], {count: 4});
        headerElements.undo().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 5});
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

        fieldElements(2).buttons.remove().click();
        get([`editor-field-panel`], {count: 4});
        headerElements.save().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 4});
        headerElements.end().should('not.be.disabled');

        cy.wait(['@PUTupdate1']);

        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: [
                INITIAL_SURVEY.fields[0],
                INITIAL_SURVEY.fields[1],
                INITIAL_SURVEY.fields[3],
                INITIAL_SURVEY.fields[4],
            ],
        });

        // remove field 0 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate2');

        fieldElements(0).buttons.remove().click();
        get([`editor-field-panel`], {count: 3});
        headerElements.save().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 3});

        cy.wait(['@PUTupdate2']);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: [
                INITIAL_SURVEY.fields[1],
                INITIAL_SURVEY.fields[3],
                INITIAL_SURVEY.fields[4],
            ],
        });

        // remove field 2 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate3');

        fieldElements(2).buttons.remove().click();
        get([`editor-field-panel`], {count: 2});
        headerElements.save().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 2});

        cy.wait(['@PUTupdate3']);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: [INITIAL_SURVEY.fields[1], INITIAL_SURVEY.fields[3]],
        });

        // remove field 1 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate4');

        fieldElements(1).buttons.remove().click();
        get([`editor-field-panel`], {count: 1});
        headerElements.save().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 1});

        cy.wait(['@PUTupdate4']);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: [INITIAL_SURVEY.fields[1]],
        });

        // remove field 0 + save
        cy.intercept({
            method: 'PUT',
            url: `users/${USERNAME}/surveys/${INITIAL_SURVEY.survey_name}`,
            hostname: 'api.dev.fastsurvey.de',
        }).as('PUTupdate5');

        fieldElements(0).buttons.remove().click();
        get([`editor-field-panel`], {count: 0});
        headerElements.save().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 0});

        cy.wait(['@PUTupdate5']);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
            fields: [],
        });
    });

    it('header look, back button, settings look, tab navigation', function () {
        headerElements.title();
        headerElements.link();
        headerElements.end();

        settingsElements.tabAbout();
        settingsElements.inputTitle();
        settingsElements.inputIdentifier();

        settingsElements.tabVisibility().click();
        settingsElements.startDate();
        settingsElements.endDate();

        headerElements.back().click();
        cy.url().should('contains', '/surveys');
    });

    it('start/end buttons', function () {
        cy.log('assert initial state');
        assertPillState('running');

        cy.log('reopen survey');
        headerElements.end().click();
        headerElements.reopen();
        assertPillState('finished');
        cy.reload();
        assertPillState('finished');

        cy.log('close survey again');
        headerElements.reopen().click();
        headerElements.end();
        assertPillState('running');
    });

    it('changing a survey name', function () {
        const {INITIAL_SURVEY, TMP_SURVEY_NAME} = this.configsJSON.EDITOR;
        const SURVEY_NAME = INITIAL_SURVEY.survey_name;

        // initial state
        settingsElements.inputIdentifier().should('have.value', SURVEY_NAME);
        cy.url().should('contains', `/editor/${SURVEY_NAME}`);

        // refresh button
        settingsElements.refreshIdentifier().click();
        settingsElements.inputIdentifier().should('not.have.value', SURVEY_NAME);
        headerElements.save();

        // changing survey name
        settingsElements.inputIdentifier().clear().type(TMP_SURVEY_NAME);
        headerElements.save().click();
        cy.url().should('contains', `/editor/${TMP_SURVEY_NAME}`);
        cy.reload();
        settingsElements.inputIdentifier().should('have.value', TMP_SURVEY_NAME);
        cy.url().should('contains', `/editor/${TMP_SURVEY_NAME}`);

        // changing it back
        settingsElements.inputIdentifier().clear().type(SURVEY_NAME);
        headerElements.save().click();
        cy.url().should('contains', `/editor/${SURVEY_NAME}`);
        cy.reload();
        settingsElements.inputIdentifier().should('have.value', SURVEY_NAME);
        cy.url().should('contains', `/editor/${SURVEY_NAME}`);
    });

    it('fields from fixture are present, undo functionality', function () {
        const {INITIAL_SURVEY, MODIFIED_SURVEY} = this.configsJSON.EDITOR;

        settingsElements
            .inputTitle()
            .clear()
            .type(MODIFIED_SURVEY.title)
            .should('have.value', MODIFIED_SURVEY.title);

        cy.reload();
        range(4).forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'isnotcollapsed');
        });
        assertSurveyState(INITIAL_SURVEY);

        settingsElements
            .inputIdentifier()
            .clear()
            .type(MODIFIED_SURVEY.survey_name)
            .should('have.value', MODIFIED_SURVEY.survey_name);

        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);

        cy.reload();
        range(4).forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'isnotcollapsed');
        });

        // assert the correct order
        expect(INITIAL_SURVEY.fields[0].type).to.equal('markdown');
        expect(INITIAL_SURVEY.fields[1].type).to.equal('text');
        expect(INITIAL_SURVEY.fields[2].type).to.equal('email');
        expect(INITIAL_SURVEY.fields[3].type).to.equal('selection');

        MODIFIED_SURVEY.fields.forEach(
            (newFieldConfig: types.SurveyField, index: number) => {
                if (newFieldConfig.type !== 'break') {
                    fieldElements(index)
                        .inputs.description()
                        .clear()
                        .type(newFieldConfig.description);
                    assertFieldState(newFieldConfig, index);
                }
            },
        );

        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);

        cy.reload();
        range(4).forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'isnotcollapsed');
        });
        assertSurveyState(INITIAL_SURVEY);

        // Whether a change in fields is made to the description or
        // any other parameter, is transparent to the editor ->
        // therefore the other parameters can be tested via component
        // testing on single fields
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
        navbarButtonSurveys().click({force: true});
        assertEditorPath(survey_name);
        warningMessage().contains('save or undo');
    });

    it('save not possible with invalid fields', () => {
        const assertInvalidFieldState = () => {
            assertHeaderState('unsynced');
            headerElements.save().click();
            warningMessage().contains('Invalid fields');
            headerElements.undo().click();
            assertHeaderState('synced');
        };

        settingsElements.inputTitle().clear().should('be.empty');
        assertInvalidFieldState();

        cy.reload();

        settingsElements.inputTitle().clear().should('be.empty');

        fieldElements(0).buttons.collapse().click();
        fieldElements(2).buttons.collapse().click();
        assertFieldCollapseState(0, 'isnotcollapsed');
        assertFieldCollapseState(2, 'isnotcollapsed');

        fieldElements(0).inputs.description().clear();
        fieldElements(2).inputs.description().clear();

        assertInvalidFieldState();
    });

    it('add field popup', function () {
        addFieldPopup.panel().should('not.be.visible');
        fieldElements(0).buttons.addBefore().click();
        addFieldPopup.panel().should('be.visible');
        addFieldPopup.cancelAdd().click();
        addFieldPopup.panel().should('not.be.visible');

        fieldElements(2).buttons.addBefore().click();
        addFieldPopup.panel().should('be.visible');
        addFieldPopup.activeSelect().should('have.length', 0);
        ['email', 'text', 'selection', 'break', 'markdown'].forEach(
            (fieldType: any) => {
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
            },
        );
        addFieldPopup.cancelAdd().click();
        addFieldPopup.panel().should('not.be.visible');
    });

    it('adding a text field, undo adding', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        const assertLocalField = (index: number) => {
            fieldElements(index).inputs.minChars().should('have.value', '0');
            fieldElements(index).inputs.maxChars().should('have.value', '2000');
        };

        // add text field at index 0
        fieldElements(0).buttons.addBefore().click();
        addFieldPopup.selectField('text').click();
        addFieldPopup.submitAdd().click();

        // assert intial state after adding
        assertFieldCollapseState(0, 'isnotcollapsed');
        assertDataCy(cy.focused(), 'input-description');
        cy.focused()
            .parents('[data-cy*="editor-field-panel-0 "]')
            .should('have.length', 1);
        fieldElements(0).inputs.description().should('be.empty');
        assertLocalField(0);

        // undo and assert state after save
        headerElements.undo().click();
        assertHeaderState('synced');
        get([`editor-field-panel`], {count: 5});
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER,
        });

        // edit field to match fixture
        fieldElements(1).buttons.addBefore().click();
        addFieldPopup.selectField('text').click();
        addFieldPopup.submitAdd().click();
        assertFieldCollapseState(1, 'isnotcollapsed');
        fieldElements(1).inputs.description().type(ADDED_FIELDS.TEXT.description);

        // save and assert state after save
        headerElements.save().click();
        assertHeaderState('synced');
        fieldElements(1)
            .inputs.description()
            .should('have.value', ADDED_FIELDS.TEXT.description);
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
            fieldElements(2).inputs.regex().should('have.value', '.*');
            fieldElements(2).inputs.hint().should('have.value', 'Any email address');
            fieldElements(2)
                .inputs.toggleVerify()
                .find('[data-cy*="no"]')
                .should('have.attr', 'data-cy')
                .and('contain', 'isactive');
        };

        // add email field at index 2
        fieldElements(2).buttons.addBefore().click();
        addFieldPopup.selectField('email').click();
        addFieldPopup.submitAdd().click();

        // assert intial state after adding
        assertFieldCollapseState(2, 'isnotcollapsed');
        assertDataCy(cy.focused(), 'input-description');
        cy.focused()
            .parents('[data-cy*="editor-field-panel-2 "]')
            .should('have.length', 1);
        fieldElements(2).inputs.description().should('be.empty');
        assertLocalField();

        // edit field to match fixture
        fieldElements(2).inputs.description().type(ADDED_FIELDS.EMAIL.description);

        // save and assert state after save
        headerElements.save().click();
        assertHeaderState('synced');
        fieldElements(2)
            .inputs.description()
            .should('have.value', ADDED_FIELDS.EMAIL.description);
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
        fieldElements(3).buttons.addBefore().click();
        addFieldPopup.selectField('selection').click();
        addFieldPopup.submitAdd().click();

        // assert intial state after adding
        assertFieldCollapseState(3, 'isnotcollapsed');
        assertDataCy(cy.focused(), 'input-description');
        cy.focused()
            .parents('[data-cy*="editor-field-panel-3 "]')
            .should('have.length', 1);
        fieldElements(3).inputs.description().should('be.empty');
        fieldElements(3).inputs.description().should('be.empty');
        fieldElements(3).inputs.anyOptionInput().should('have.length', 0);
        fieldElements(3).inputs.minSelect().should('have.value', '0');
        fieldElements(3).inputs.maxSelect().should('have.value', '0');

        // edit field to match fixture
        fieldElements(3).inputs.description().type(ADDED_FIELDS.SELECTION.description);
        ADDED_FIELDS.SELECTION.options.forEach((o: string, i: number) => {
            fieldElements(3).inputs.addOption().click();
            fieldElements(3).inputs.optionInput(i).type(o);
        });
        fieldElements(3).inputs.maxSelect().type(ADDED_FIELDS.SELECTION.max_select);

        // change max-select
        headerElements.save().click();

        // save and assert state after save
        assertHeaderState('synced');
        fieldElements(3)
            .inputs.description()
            .should('have.value', ADDED_FIELDS.SELECTION.description);
        fieldElements(3).inputs.anyOptionInput().should('have.length', 2);
        ADDED_FIELDS.SELECTION.options.forEach((o: string, i: number) => {
            fieldElements(3).inputs.optionInput(i).should('have.value', o);
        });
        fieldElements(3)
            .inputs.maxSelect()
            .should('have.value', ADDED_FIELDS.SELECTION.max_select);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 3, ADDED_FIELDS.SELECTION),
        });
    });

    it('adding a markdown field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        // add email field at index 2
        fieldElements(4).buttons.addBefore().click();
        addFieldPopup.selectField('markdown').click();
        addFieldPopup.submitAdd().click();

        // assert intial state after adding
        assertFieldCollapseState(4, 'isnotcollapsed');
        assertDataCy(cy.focused(), 'input-description');
        cy.focused()
            .parents('[data-cy*="editor-field-panel-4 "]')
            .should('have.length', 1);
        fieldElements(4).inputs.description().should('be.empty');

        // edit field to match fixture
        fieldElements(4).inputs.description().type(ADDED_FIELDS.MARKDOWN.description);

        // save and assert state after save
        headerElements.save().click();
        assertHeaderState('synced');
        fieldElements(4)
            .inputs.description()
            .should('have.value', ADDED_FIELDS.MARKDOWN.description);
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 4, ADDED_FIELDS.MARKDOWN),
        });
    });

    it('adding a break field', function () {
        const {INITIAL_SURVEY, INITIAL_NEXT_IDENTIFIER, ADDED_FIELDS} =
            this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        // add email field at index 2
        fieldElements(3).buttons.addBefore().click();
        addFieldPopup.selectField('break').click();
        addFieldPopup.submitAdd().click();

        // save and assert state after save
        headerElements.save().click();
        assertHeaderState('synced');
        assertConfigInDB(USERNAME, PASSWORD, {
            ...INITIAL_SURVEY,
            next_identifier: INITIAL_NEXT_IDENTIFIER + 1,
            fields: insertInArray(INITIAL_SURVEY.fields, 3, ADDED_FIELDS.BREAK),
        });
    });

    // TODO: Add test for newly adding a survey and adding multiple fields before saving the first time -> max_identifier, etc. working correctly

    it('copy and paste', function () {
        const {INITIAL_SURVEY, COPY_PASTE_SURVEY} = this.configsJSON.EDITOR;
        const {USERNAME, PASSWORD} = this.accountJSON;

        /*
        break field not included in this config

        INITIAL_SURVEY: 0 1 2 3 4
        COPY_PASTE_SURVEY:
        0->8
        0
        1
        2->7
        1->6
        2
        3
        4
        3->5
        0->8->9
        1->6->10
        2->7->11
        3->5->12
        */

        const copyPasteSequence = () => {
            const copyAndPaste = (fromIndex: number, toIndex: number) => {
                fieldElements(fromIndex).buttons.copy().click();
                fieldElements(toIndex).buttons.pasteBefore().click();
            };
            range(4).map((index) => {
                fieldElements(index).buttons.collapse().click();
            });
            copyAndPaste(3, 5); // 3->5
            copyAndPaste(1, 2); // 1->6
            copyAndPaste(3, 2); // 2->7
            copyAndPaste(0, 0); // 0->8
            copyAndPaste(0, 9); // 0->8->9
            copyAndPaste(4, 10); // 1->6->10
            copyAndPaste(3, 11); // 2->7->11
            copyAndPaste(8, 12); // 3->5->12
            range(13).map((index) => assertFieldCollapseState(index, 'isnotcollapsed'));
        };

        // undo works
        copyPasteSequence();

        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.undo().click();
        assertSurveyState(INITIAL_SURVEY);
        cy.reload();
        range(4).forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'isnotcollapsed');
        });
        assertSurveyState(INITIAL_SURVEY);
        range(4).forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'iscollapsed');
        });

        // save works
        copyPasteSequence();
        assertSurveyState(COPY_PASTE_SURVEY);
        headerElements.save().click();
        assertSurveyState(COPY_PASTE_SURVEY);
        cy.reload();
        [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].forEach((index) => {
            fieldElements(index).buttons.collapse().click();
            assertFieldCollapseState(index, 'isnotcollapsed');
        });
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

    // Test with component test of fields:
    // TODO: looks as expected
    // TODO: collapsing fields
    // TODO: all possible error messages
});
