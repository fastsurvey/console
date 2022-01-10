import React, {useEffect, useState} from 'react';
import {constants} from '/src/utilities';
import VisualEmailSettings from './visual-email-settings';
import {types} from '/src/types';

function EmailSettings(props: {
    localFieldConfig: types.EmailField;
    setLocalFieldConfig(fieldConfigChanges: types.SurveyFieldChange): void;
    disabled: boolean;
}) {
    const getCustomSetup = (regex: string, hint: string) => ({
        label: 'Custom Rule',
        value: constants.formOptions.EMAIL_REGEX.length,
        regex: regex,
        hint: hint,
    });

    // Initial state = custom (last index + 1)
    const [setupValue, setSetupValue] = useState(
        constants.formOptions.EMAIL_REGEX.length,
    );
    const [customSetup, setCustomSetup] = useState(
        getCustomSetup(props.localFieldConfig.regex, props.localFieldConfig.hint),
    );

    useEffect(() => {
        const newSetup: types.EmailRegexSetup[] =
            constants.formOptions.EMAIL_REGEX.filter(
                (setup) =>
                    setup.regex === props.localFieldConfig.regex &&
                    setup.hint === props.localFieldConfig.hint,
            );

        if (newSetup.length === 0) {
            setSetupValue(constants.formOptions.EMAIL_REGEX.length);
            setCustomSetup(
                getCustomSetup(
                    props.localFieldConfig.regex,
                    props.localFieldConfig.hint,
                ),
            );
        } else {
            setSetupValue(newSetup[0].value);
        }
    }, [props.localFieldConfig.regex, props.localFieldConfig.hint]);

    return (
        <VisualEmailSettings
            localFieldConfig={props.localFieldConfig}
            setupValue={setupValue}
            customSetup={customSetup}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default EmailSettings;
