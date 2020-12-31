import React from 'react';
import {configTypes, validateField} from 'utilities';
import VisualOptionSettings from './visual-option-settings';

interface Props {
    fieldConfig: configTypes.OptionField;
    setFieldConfig(
        fieldConfig: configTypes.OptionField,
        subValidation: (fieldConfig: configTypes.OptionField) => boolean,
    ): void;
    disabled: boolean;
}
function OptionSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: configTypes.OptionField) {
        props.setFieldConfig(newFieldConfig, validateField);
    }

    return (
        <VisualOptionSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            updateFieldConfig={updateFieldConfig}
        />
    );
}

export default OptionSettings;
