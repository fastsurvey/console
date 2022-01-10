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

const INITIAL_STATE: types.TextField = {
    identifier: 0,
    local_id: 0,
    type: 'text',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    min_chars: 274,
    max_chars: 813,
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
    getFieldElements(0).inputs.minChars().should('be.disabled');
    getFieldElements(0).inputs.maxChars().should('be.disabled');
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
    getFieldElements(0).inputs.minChars().should('not.be.disabled');
    getFieldElements(0).inputs.maxChars().should('not.be.disabled');
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
    getFieldElements(0).inputs.minChars().should('have.value', INITIAL_STATE.min_chars);
    getFieldElements(0).inputs.maxChars().should('have.value', INITIAL_STATE.max_chars);

    getFieldElements(0)
        .inputs.description()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');

    getFieldElements(0)
        .inputs.minChars()
        .clear()
        .should('have.value', '0')
        .type('s098a')
        .should('have.value', '98');
    getFieldElements(0)
        .inputs.maxChars()
        .clear()
        .should('have.value', '0')
        .type('s098a')
        .should('have.value', '98');
});
