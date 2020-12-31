import React from 'react';
import {configTypes} from 'utilities';
import VisualSelectionSettings from './visual-selection-settings';

interface Props {
    fieldConfig: configTypes.SelectionField;
    setFieldConfig(fieldConfig: configTypes.SelectionField): void;
    disabled: boolean;
}
function SelectionSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: configTypes.SelectionField) {
        props.setFieldConfig(newFieldConfig);
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
