import React from 'react';
import {mount, unmount} from '@cypress/react';
import {types} from '/src/types';

import {FieldStateWrapper} from './utilities/field-state-wrapper';
import {getFieldElements} from './utilities/get-field-elements';
import {assertCommonRemove} from './utilities/common-asserts';

const INITIAL_STATE: types.BreakField = {
    identifier: 0,
    local_id: 0,
    type: 'break',
};

it('numbering, collapsing, remove, validation', () => {
    assertCommonRemove(INITIAL_STATE);
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
    getFieldElements(0).panel();
    getFieldElements(0).buttons.remove().should('be.disabled');
    getFieldElements(0).buttons.remove().click({force: true});
    getFieldElements(0).panel();
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={INITIAL_STATE}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0).panel();
    getFieldElements(0).buttons.remove().should('not.be.disabled');
});
