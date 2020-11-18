import React from 'react';
import {configTypes} from 'utilities';
import {validators} from 'utilities';
import VisualSelectionSettings from './visual-selection-settings';

interface SelectionSettingsProps {
    fieldConfig: configTypes.SelectionField;
    setFieldConfig(
        fieldConfig: configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.SelectionField) => boolean,
    ): void;
    disabled: boolean;
}
function SelectionSettings(props: SelectionSettingsProps) {
    function updateFieldConfig(newFieldConfig: configTypes.SelectionField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.SelectionField) =>
                newFieldConfig.fields.every((optionField) =>
                    validators.title(optionField.title),
                ) &&
                validators.minSelect(newFieldConfig) &&
                validators.maxSelect(newFieldConfig),
        );
    }

    return (
        <VisualSelectionSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            updateFieldConfig={updateFieldConfig}
        />
    );
}

export default SelectionSettings;
