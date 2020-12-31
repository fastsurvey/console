import React from 'react';
import {configTypes, validateField} from 'utilities';
import VisualTextSettings from 'pages/configuration/editor/fields/text-settings/visual-text-settings';

interface Props {
    fieldConfig: configTypes.TextField;
    setFieldConfig(
        fieldConfig: configTypes.TextField,
        subValidation: (fieldConfig: configTypes.TextField) => boolean,
    ): void;
    disabled: boolean;
}
function TextSettings(props: Props) {
    function updateFieldConfig(newFieldConfig: configTypes.TextField) {
        props.setFieldConfig(newFieldConfig, validateField);
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
