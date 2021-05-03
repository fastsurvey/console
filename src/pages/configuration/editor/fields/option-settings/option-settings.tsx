import React from 'react';
import VisualOptionSettings from './visual-option-settings';
import {types} from 'types';

interface Props {
    fieldConfig: types.OptionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function OptionSettings(props: Props) {
    return (
        <VisualOptionSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default OptionSettings;
