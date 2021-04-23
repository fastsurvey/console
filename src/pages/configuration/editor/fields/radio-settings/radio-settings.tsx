import React from 'react';
import {types} from 'types';
import FieldOptionsList from '../field-options-list/field-options-list';

interface Props {
    fieldConfig: types.RadioField;
    setFieldConfig(fieldConfig: types.RadioField | types.SelectionField): void;
    disabled: boolean;
}
function RadioFieldConfigForm(props: Props) {
    function updateFieldConfig(
        newFieldConfig: types.RadioField | types.SelectionField,
    ) {
        props.setFieldConfig(newFieldConfig);
    }

    return (
        <FieldOptionsList
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            updateFieldConfig={updateFieldConfig}
        />
    );
}

export default RadioFieldConfigForm;
