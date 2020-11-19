import React from 'react';
import {configTypes} from 'utilities';
import {validators} from 'utilities';
import VisualSelectionSettings from './visual-selection-settings';

interface Props {
    fieldConfig: configTypes.SelectionField;
    setFieldConfig(
        fieldConfig: configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.SelectionField) => boolean,
    ): void;
    disabled: boolean;
}
function SelectionSettings(props: Props) {
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
