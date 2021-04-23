import React from 'react';
import VisualOptionSettings from './visual-option-settings';
import {types} from 'types';

interface Props {
    fieldConfig: types.OptionField;
    setFieldConfig(fieldConfig: types.OptionField): void;
    disabled: boolean;
}
function OptionSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: types.OptionField) {
        props.setFieldConfig(newFieldConfig);
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
