import React from 'react';
import {types} from 'types';
import VisualTextSettings from 'pages/configuration/editor/fields/text-settings/visual-text-settings';

interface Props {
    fieldConfig: types.TextField;
    setFieldConfig(fieldConfig: types.TextField): void;
    disabled: boolean;
}
function TextSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: types.TextField) {
        props.setFieldConfig(newFieldConfig);
    }
    return (
        <VisualTextSettings
            fieldConfig={props.fieldConfig}
            disabled={props.disabled}
            updateFieldConfig={updateFieldConfig}
        />
    );
}

export default TextSettings;
