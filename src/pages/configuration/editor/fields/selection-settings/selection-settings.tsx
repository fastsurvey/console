import React from 'react';
import {types} from '/src/types';
import VisualSelectionSettings from './visual-selection-settings';

interface Props {
    fieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function SelectionSettings(props: Props) {
    return (
        <VisualSelectionSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default SelectionSettings;
