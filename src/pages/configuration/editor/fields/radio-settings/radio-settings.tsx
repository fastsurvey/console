import React from 'react';
import {configTypes, validators} from 'utilities';
import FieldOptionsList from '../field-option-list/field-option-list';

interface RadioFieldConfigFormProps {
    fieldConfig: configTypes.RadioField;
    setFieldConfig(
        fieldConfig: configTypes.RadioField | configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.RadioField) => boolean,
    ): void;
    disabled: boolean;
}

function RadioFieldConfigForm(props: RadioFieldConfigFormProps) {
    const titleIsValid = validators.title;

    function updateFieldConfig(
        newFieldConfig: configTypes.RadioField | configTypes.SelectionField,
    ) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.RadioField) =>
                newFieldConfig.fields.every((optionField) =>
                    titleIsValid(optionField.title),
                ),
        );
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
