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
    assertDataCy,
} from './utilities/common-asserts';
import {getFieldElements} from './utilities/get-field-elements';
import {range} from 'lodash';

const INITIAL_STATE: types.EmailField = {
    identifier: 0,
    local_id: 0,
    type: 'email',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    regex: '.*',
    hint: 'Any email address',
    verify: false,
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
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isnotopen');
    getFieldElements(0)
        .inputs.dropDownEmailFormatToggle()
        .should('be.disabled')
        .click({force: true});
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isnotopen');
    getFieldElements(0).inputs.regex().should('be.disabled');
    getFieldElements(0).inputs.hint().should('be.disabled');
    getFieldElements(0).inputs.toggleVerifyYes().should('be.disabled');
    getFieldElements(0).inputs.toggleVerifyNo().should('be.disabled');
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isnotopen');
    getFieldElements(0)
        .inputs.dropDownEmailFormatToggle()
        .should('not.be.disabled')
        .click();
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isopen');
    assertDataCy(
        getFieldElements(0)
            .inputs.dropDownEmailFormatOption(0)
            .should('not.be.disabled'),
        'isselected',
    );
    assertDataCy(
        getFieldElements(0)
            .inputs.dropDownEmailFormatOption(1)
            .should('not.be.disabled'),
        'isnotselected',
    );
    assertDataCy(
        getFieldElements(0)
            .inputs.dropDownEmailFormatOption(2)
            .should('not.be.disabled'),
        'isnotselected',
    );
    getFieldElements(0).inputs.regex().should('not.be.disabled');
    getFieldElements(0).inputs.hint().should('not.be.disabled');
    getFieldElements(0).inputs.toggleVerifyYes().should('not.be.disabled');
    getFieldElements(0).inputs.toggleVerifyNo().should('not.be.disabled');
});

it('initial state, modifying stuff', () => {
    const assertDropDownState = (selectedIndex: number, label: string) => {
        getFieldElements(0)
            .inputs.dropDownEmailFormatToggle()
            .should('have.text', label);
        range(3).forEach((index) =>
            assertDataCy(
                getFieldElements(0).inputs.dropDownEmailFormatOption(index),
                index === selectedIndex ? 'isselected' : 'isnotselected',
            ),
        );
    };
    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );

    // assert initial state
    getFieldElements(0)
        .inputs.description()
        .should('have.value', INITIAL_STATE.description);
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isnotopen');
    getFieldElements(0).inputs.dropDownEmailFormatToggle().click();
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isopen');
    assertDropDownState(0, 'Any Email');
    getFieldElements(0).inputs.regex().should('have.value', INITIAL_STATE.regex);
    getFieldElements(0).inputs.hint().should('have.value', INITIAL_STATE.hint);

    // modify description doesn't change dropdown state
    getFieldElements(0)
        .inputs.description()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');
    assertDropDownState(0, 'Any Email');

    // modifying regex and hint -> 'Custom Rule' present in dropdown
    getFieldElements(0)
        .inputs.regex()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');
    assertDropDownState(2, 'Custom Rule');
    getFieldElements(0)
        .inputs.hint()
        .clear()
        .should('be.empty')
        .type('smeofha')
        .should('have.value', 'smeofha');
    assertDropDownState(2, 'Custom Rule');

    // Click on 'Unique @example.com Email' preset in dropdown
    getFieldElements(0).inputs.dropDownEmailFormatOption(1).click();
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isnotopen');
    getFieldElements(0).inputs.dropDownEmailFormatToggle().click();
    assertDataCy(getFieldElements(0).inputs.dropDownEmailFormat(), 'isopen');
    assertDropDownState(1, 'Unique @example.com Email');
    getFieldElements(0).inputs.regex().should('have.value', '[a-z0-9]+@example.com');
    getFieldElements(0)
        .inputs.hint()
        .should(
            'have.value',
            '<username>@example.com (e.g. ab12cde@example.com), lowercase',
        );
});

it('verify toggle', () => {
    const assertToggleState = (state: boolean) => {
        assertDataCy(
            getFieldElements(0).inputs.toggleVerifyYes(),
            state ? 'isactive' : 'isinactive',
        );
        assertDataCy(
            getFieldElements(0).inputs.toggleVerifyNo(),
            state ? 'isinactive' : 'isactive',
        );
    };

    mount(
        <FieldStateWrapper
            initialFieldConfig={{...INITIAL_STATE, verify: true}}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertToggleState(true);
    getFieldElements(0).inputs.toggleVerifyYes().click();
    assertToggleState(true);
    getFieldElements(0).inputs.toggleVerifyNo().click();
    assertToggleState(false);
    getFieldElements(0).inputs.toggleVerifyYes().click();
    assertToggleState(true);
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={{...INITIAL_STATE, verify: false}}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertToggleState(false);
    getFieldElements(0).inputs.toggleVerifyNo().click();
    assertToggleState(false);
    getFieldElements(0).inputs.toggleVerifyYes().click();
    assertToggleState(true);
    getFieldElements(0).inputs.toggleVerifyNo().click();
    assertToggleState(false);
});
