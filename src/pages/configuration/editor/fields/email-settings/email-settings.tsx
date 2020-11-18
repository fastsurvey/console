import React, {useEffect, useState} from 'react';
import {configTypes, formOptions, validators} from 'utilities';
import VisualEmailSettings from './visual-email-settings';

interface Props {
    fieldConfig: configTypes.EmailField;
    setFieldConfig(
        fieldConfig: configTypes.EmailField,
        subValidation: (fieldConfig: configTypes.EmailField) => boolean,
    ): void;
    disabled: boolean;
}
function EmailSettings(props: Props) {
    const regexIsValid = validators.regex;
    const hintIsValid = validators.hint;

    // Initial state = custom
    const [setupValue, setSetupValue] = useState(
        formOptions.EMAIL_REGEX.length,
    );
    const [customSetup, setCustomSetup] = useState({
        label: 'Custom Rule',
        value: formOptions.EMAIL_REGEX.length,
        regex: props.fieldConfig.regex,
        hint: props.fieldConfig.hint,
    });

    useEffect(() => {
        const newSetup: configTypes.EmailRegexSetup[] = formOptions.EMAIL_REGEX.filter(
            (setup) =>
                setup.regex === props.fieldConfig.regex &&
                setup.hint === props.fieldConfig.hint,
        );

        if (newSetup.length === 0) {
            setSetupValue(formOptions.EMAIL_REGEX.length);
            setCustomSetup({
                label: 'Custom Rule',
                value: formOptions.EMAIL_REGEX.length,
                regex: props.fieldConfig.regex,
                hint: props.fieldConfig.hint,
            });
        } else {
            setSetupValue(newSetup[0].value);
        }
    }, [props.fieldConfig.regex, props.fieldConfig.hint]);

    function updateFieldConfig(newFieldConfig: configTypes.EmailField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.EmailField) =>
                hintIsValid(newFieldConfig.hint) &&
                regexIsValid(newFieldConfig.regex),
        );
    }

    return (
        <VisualEmailSettings
            fieldConfig={props.fieldConfig}
            setupValue={setupValue}
            customSetup={customSetup}
            disabled={props.disabled}
            updateFieldConfig={updateFieldConfig}
        />
    );
}

export default EmailSettings;
