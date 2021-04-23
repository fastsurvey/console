import React, {useEffect, useState} from 'react';
import {formOptions} from 'utilities';
import VisualEmailSettings from './visual-email-settings';
import {types} from 'types';

interface Props {
    fieldConfig: types.EmailField;
    setFieldConfig(fieldConfig: types.EmailField): void;
    disabled: boolean;
}
function EmailSettings(props: Props) {
    const getCustomSetup = (regex: string, hint: string) => ({
        label: 'Custom Rule',
        value: formOptions.EMAIL_REGEX.length,
        regex: regex,
        hint: hint,
    });

    // Initial state = custom (last index + 1)
    const [setupValue, setSetupValue] = useState(
        formOptions.EMAIL_REGEX.length,
    );
    const [customSetup, setCustomSetup] = useState(
        getCustomSetup(props.fieldConfig.regex, props.fieldConfig.hint),
    );

    useEffect(() => {
        const newSetup: types.EmailRegexSetup[] = formOptions.EMAIL_REGEX.filter(
            (setup) =>
                setup.regex === props.fieldConfig.regex &&
                setup.hint === props.fieldConfig.hint,
        );

        if (newSetup.length === 0) {
            setSetupValue(formOptions.EMAIL_REGEX.length);
            setCustomSetup(
                getCustomSetup(props.fieldConfig.regex, props.fieldConfig.hint),
            );
        } else {
            setSetupValue(newSetup[0].value);
        }
    }, [props.fieldConfig.regex, props.fieldConfig.hint]);

    function updateFieldConfig(newFieldConfig: types.EmailField) {
        props.setFieldConfig(newFieldConfig);
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
