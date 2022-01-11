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

const INITIAL_STATE: types.SelectionField = {
    identifier: 0,
    local_id: 0,
    type: 'selection',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    options: [
        {title: 'option a', local_id: 0},
        {title: 'option b', local_id: 1},
    ],
    min_select: 0,
    max_select: 2,
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
    getFieldElements(0).inputs.optionInput(0).should('be.disabled');
    getFieldElements(0).inputs.optionInput(1).should('be.disabled');
    getFieldElements(0).inputs.deleteOption(0).should('be.disabled');
    getFieldElements(0).inputs.deleteOption(1).should('be.disabled');
    getFieldElements(0).inputs.addOption().should('be.disabled');
    getFieldElements(0).inputs.minSelect().should('be.disabled');
    getFieldElements(0).inputs.maxSelect().should('be.disabled');
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
    getFieldElements(0).inputs.optionInput(0).should('not.be.disabled');
    getFieldElements(0).inputs.optionInput(1).should('not.be.disabled');
    getFieldElements(0).inputs.deleteOption(0).should('not.be.disabled');
    getFieldElements(0).inputs.deleteOption(1).should('not.be.disabled');
    getFieldElements(0).inputs.addOption().should('not.be.disabled');
    getFieldElements(0).inputs.minSelect().should('not.be.disabled');
    getFieldElements(0).inputs.maxSelect().should('not.be.disabled');
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
        .inputs.minSelect()
        .should('have.value', INITIAL_STATE.min_select);
    getFieldElements(0)
        .inputs.maxSelect()
        .should('have.value', INITIAL_STATE.max_select);

    getFieldElements(0)
        .inputs.description()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');
    getFieldElements(0)
        .inputs.minSelect()
        .clear()
        .should('have.value', '0')
        .type('s098a')
        .should('have.value', '98');
    getFieldElements(0)
        .inputs.maxSelect()
        .clear()
        .should('have.value', '0')
        .type('s098a')
        .should('have.value', '98');
});

it('adding options', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0).inputs.addOption().click();
    cy.wait(100);
    assertDataCy(cy.focused(), 'input-option-2 ');
    getFieldElements(0).inputs.optionInput(2).should('be.empty');
    getFieldElements(0)
        .inputs.optionInput(2)
        .type('fghjk')
        .should('have.value', 'fghjk')
        .type('{enter}');
    cy.wait(100);
    assertDataCy(cy.focused(), 'input-option-3 ');
    getFieldElements(0).inputs.optionInput(3).should('be.empty');
});

it('removing options', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0)
        .inputs.optionInput(0)
        .should('have.value', INITIAL_STATE.options[0].title);
    getFieldElements(0)
        .inputs.optionInput(1)
        .should('have.value', INITIAL_STATE.options[1].title);
    getFieldElements(0).inputs.optionList().find('input').should('have.length', 2);

    getFieldElements(0).inputs.deleteOption(0).click();
    getFieldElements(0).inputs.optionList().find('input').should('have.length', 1);
    getFieldElements(0)
        .inputs.optionInput(0)
        .should('have.value', INITIAL_STATE.options[1].title);

    getFieldElements(0).inputs.deleteOption(0).click();
    getFieldElements(0).inputs.optionList().find('input').should('have.length', 0);
});
