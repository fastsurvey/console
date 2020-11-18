import React from 'react';
import {configTypes} from 'utilities';
import VisualOptionSettings from './visual-option-settings';

interface OptionSettingsProps {
    fieldConfig: configTypes.OptionField;
    setFieldConfig(
        fieldConfig: configTypes.OptionField,
        subValidation: (fieldConfig: configTypes.OptionField) => boolean,
    ): void;
    disabled: boolean;
}
function OptionSettings(props: OptionSettingsProps) {
    function updateFieldConfig(newFieldConfig: configTypes.OptionField) {
        props.setFieldConfig(newFieldConfig, () => true);
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
