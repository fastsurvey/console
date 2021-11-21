import * as utilities from '../../support/utilities';

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

describe('The Editor Page', () => {
    before(() => {
        // @ts-ignore
        cy.seedConfigData();

        // @ts-ignore
        cy.seedEditorData();
    });

    beforeEach(() => {
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

    it('header looks as expected, back button works', function () {
        headerElements.title();
        headerElements.link();
        headerElements.reopen();

        headerElements.back().click();
        cy.url().should('eq', 'http://localhost:3000/configurations');
    });

    it('settings look as expected, tab navigation work', function () {
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

    const assertPillState = (state: 'draft' | 'pending' | 'running' | 'finished') => {
        headerElements.pill().should('have.attr', 'data-cy').and('contain', state);
        headerElements
            .link()
            .should('have.attr', 'data-cy')
            .and('contains', state === 'draft' ? 'isinactive' : 'isactive');
    };

    it('start/end as expected', function () {
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

    it('draft toggle works as expected', function () {
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

    // TODO: test appearance
    // - [x] heading
    // - [x] back-button
    // - [x] tabs in settings
    //
    // TODO: test publish/visibility logic
    // - [x] test rendered buttons
    // - [ ] test db state
    // - [ ] test reachability via link
    // - [x] test toggle (incl. undo)

    // TODO: test settings
    // - [ ] save not possible in invalid state
    // - [ ] change survey_name
    //
    // TODO: test fields
    // - [ ] fields from fixture-config are rendered correctly
    // - [ ] save not possible with any invalid field (one of each type, just modify the title, the rest is tested via components)
    // - [ ] remove field (incl. undo)
    // - [ ] add field (incl. undo)
    //
    // IDEA: transpile UI into JSON object and do asserts on that JSON object
    // component tests for:
    // - [ ] collapsing fields
});
