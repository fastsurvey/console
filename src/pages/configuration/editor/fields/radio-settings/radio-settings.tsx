import React from 'react';
import {types} from 'types';
import FieldOptionsList from '../field-options-list/field-options-list';

interface Props {
    fieldConfig: types.RadioField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function RadioFieldConfigForm(props: Props) {
    return (
        <FieldOptionsList
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default RadioFieldConfigForm;
