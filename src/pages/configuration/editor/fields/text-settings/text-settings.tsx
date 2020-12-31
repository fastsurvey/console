import React from 'react';
import {configTypes} from 'utilities';
import VisualTextSettings from 'pages/configuration/editor/fields/text-settings/visual-text-settings';

interface Props {
    fieldConfig: configTypes.TextField;
    setFieldConfig(fieldConfig: configTypes.TextField): void;
    disabled: boolean;
}
function TextSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: configTypes.TextField) {
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
