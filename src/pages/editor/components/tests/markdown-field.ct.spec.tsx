import React from 'react';
import {mount, unmount} from '@cypress/react';
import {types} from '/src/types';

import {FieldStateWrapper} from './utilities/field-state-wrapper';
import {
    assertCommonNumbering,
    assertCommonCollapsing,
    assertCommonRemove,
    assertCommonValidation,
    assertCommonDisabled,
} from './utilities/common-asserts';
import {getFieldElements} from './utilities/get-field-elements';
import {assertDataCy} from './utilities/common-asserts';

const INITIAL_STATE: types.MarkdownField = {
    identifier: 0,
    local_id: 0,
    type: 'markdown',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

it('numbering, collapsing, remove, validation', () => {
    assertCommonNumbering(INITIAL_STATE);
    assertCommonCollapsing(INITIAL_STATE);
    assertCommonRemove(INITIAL_STATE);
    assertCommonValidation(INITIAL_STATE);
});

it('disabled is passed to children', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={true}
        />,
    );
    assertCommonDisabled();
    getFieldElements(0).buttons.markdownTab('plain-text').should('not.be.disabled');
    getFieldElements(0).buttons.markdownTab('split-view').should('not.be.disabled');
    getFieldElements(0).buttons.markdownTab('rendered').should('not.be.disabled');
    getFieldElements(0).buttons.markdownHelp().click();
    getFieldElements(0).buttons.markdownDemo().should('be.disabled');
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0).inputs.description().should('not.be.disabled');
    getFieldElements(0).buttons.markdownHelp().click();
    getFieldElements(0).buttons.markdownDemo().should('not.be.disabled');
});

it('initial state, modifying stuff', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0)
        .inputs.description()
        .should('have.value', INITIAL_STATE.description);

    getFieldElements(0)
        .inputs.description()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');
});

it('tabs', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertDataCy(getFieldElements(0).buttons.markdownTab('plain-text'), 'isactive');
    getFieldElements(0).buttons.markdownTab('rendered').click();
    assertDataCy(getFieldElements(0).buttons.markdownTab('rendered'), 'isactive');
    getFieldElements(0).buttons.markdownTab('split-view').click();
    assertDataCy(getFieldElements(0).buttons.markdownTab('split-view'), 'isactive');
});

it('info icon, demo button', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );

    getFieldElements(0).noPanelMarkdownHelp();
    getFieldElements(0).buttons.markdownHelp().click();
    getFieldElements(0).panelMarkdownHelp();
    getFieldElements(0).buttons.markdownHelp().click();
    getFieldElements(0).noPanelMarkdownHelp();
    getFieldElements(0).buttons.markdownHelp().click();
    getFieldElements(0).panelMarkdownHelp();

    getFieldElements(0).buttons.markdownTab('split-view').click();
    getFieldElements(0).inputs.description().should('not.contain.value', '#');
    getFieldElements(0).markdownContent().find('h1').should('have.length', 0);

    getFieldElements(0).buttons.markdownDemo().click();
    assertDataCy(getFieldElements(0).buttons.markdownTab('plain-text'), 'isactive');

    getFieldElements(0).buttons.markdownTab('split-view').click();
    getFieldElements(0).inputs.description().should('contain.value', '#');
    getFieldElements(0).markdownContent().find('h1').should('have.length', 1);
});
