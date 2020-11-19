import React from 'react';
import {configTypes, validators} from 'utilities';
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
    const minCharsIsValid = validators.minChars(props.fieldConfig);
    const maxCharsIsValid = validators.maxChars;

    function updateFieldConfig(newFieldConfig: configTypes.TextField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.TextField) =>
                minCharsIsValid(newFieldConfig.min_chars) &&
                maxCharsIsValid(newFieldConfig.max_chars),
        );
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
