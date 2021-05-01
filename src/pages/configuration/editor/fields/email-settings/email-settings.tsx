import React, {useEffect, useState} from 'react';
import {constants} from 'utilities';
import VisualEmailSettings from './visual-email-settings';
import {types} from 'types';

interface Props {
    fieldConfig: types.EmailField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function EmailSettings(props: Props) {
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
        getCustomSetup(props.fieldConfig.regex, props.fieldConfig.hint),
    );

    useEffect(() => {
        const newSetup: types.EmailRegexSetup[] = constants.formOptions.EMAIL_REGEX.filter(
            (setup) =>
                setup.regex === props.fieldConfig.regex &&
                setup.hint === props.fieldConfig.hint,
        );

        if (newSetup.length === 0) {
            setSetupValue(constants.formOptions.EMAIL_REGEX.length);
            setCustomSetup(
                getCustomSetup(props.fieldConfig.regex, props.fieldConfig.hint),
            );
        } else {
            setSetupValue(newSetup[0].value);
        }
    }, [props.fieldConfig.regex, props.fieldConfig.hint]);

    return (
        <VisualEmailSettings
            fieldConfig={props.fieldConfig}
            setupValue={setupValue}
            customSetup={customSetup}
            disabled={props.disabled}
            setLocalFieldConfig={props.setLocalFieldConfig}
        />
    );
}

export default EmailSettings;
