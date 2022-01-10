import React from 'react';
import {mount, unmount} from '@cypress/react';
import {FieldStateWrapper} from './field-state-wrapper';
import {getFieldElements} from './get-field-elements';
import * as utilities from '../../../../../../cypress/support/utilities';
export const assertDataCy = utilities.assertDataCy;

export const assertCommonNumbering = (fieldConfig: any) => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 4,
                local_id: 0,
            }}
            fieldIndex={7}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(7).panel();
    getFieldElements(7).label().should('have.text', 'Field 8 (text)');
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 18,
                local_id: 0,
            }}
            fieldIndex={13}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(13).panel();
    getFieldElements(13).label().should('have.text', 'Field 14 (text)');
};

export const assertCommonCollapsing = (fieldConfig: any) => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 0,
                local_id: 0,
            }}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertDataCy(getFieldElements(0).panel(), 'isnotcollapsed');
    getFieldElements(0).buttons.collapse().click();
    assertDataCy(getFieldElements(0).panel(), 'iscollapsed');
};

export const assertCommonRemove = (fieldConfig: any) => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 0,
                local_id: 0,
            }}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    getFieldElements(0).panel();
    getFieldElements(0).buttons.remove().click();
    getFieldElements(0).noPanel();
};

export const assertCommonValidation = (fieldConfig: any) => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 0,
                local_id: 0,
            }}
            fieldIndex={0}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    assertDataCy(getFieldElements(0).validationBar(), 'isvalid');
    getFieldElements(0).validationBar().should('not.be.visible');
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                ...fieldConfig,
                identifier: 0,
                local_id: 0,
            }}
            fieldIndex={0}
            validation={{valid: false, message: 'custom error message'}}
            disabled={false}
        />,
    );
    assertDataCy(getFieldElements(0).validationBar(), 'isinvalid');
    getFieldElements(0).validationBar().should('be.visible');
    getFieldElements(0).validationMessage().should('have.text', 'custom error message');
};
