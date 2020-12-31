import React from 'react';
import {configTypes, validateField} from 'utilities';
import FieldOptionsList from '../field-options-list/field-options-list';

interface Props {
    fieldConfig: configTypes.RadioField;
    setFieldConfig(
        fieldConfig: configTypes.RadioField | configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.RadioField) => boolean,
    ): void;
    disabled: boolean;
}
function RadioFieldConfigForm(props: Props) {
    function updateFieldConfig(
        newFieldConfig: configTypes.RadioField | configTypes.SelectionField,
    ) {
        props.setFieldConfig(newFieldConfig, validateField);
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
