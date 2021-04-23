import React from 'react';
import {types} from 'types';
import VisualSelectionSettings from './visual-selection-settings';

interface Props {
    fieldConfig: types.SelectionField;
    setFieldConfig(fieldConfig: types.SelectionField): void;
    disabled: boolean;
}
function SelectionSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: types.SelectionField) {
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
