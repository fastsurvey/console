import React from 'react';
import {types} from '/src/types';
import VisualTextSettings from './visual-text-settings';

interface Props {
    fieldConfig: types.TextField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function TextSettings(props: Props) {
    return (
        <VisualTextSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default TextSettings;
