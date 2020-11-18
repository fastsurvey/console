import React, {useEffect, useState} from 'react';
import {validators, configTypes} from 'utilities';

import VisualField from './visual-field';
import TextSettings from '../text-settings/text-settings';
import OptionSettings from '../option-settings/option-settings';
import RadioSettings from '../radio-settings/radio-settings';
import SelectionFieldConfigForm from '../selection-settings/selection-settings';
import EmailSettings from '../email-settings/email-settings';

interface FieldProps {
    fieldConfig: configTypes.SurveyField;
    setFieldConfig(fieldConfig: configTypes.SurveyField): void;
    disabled: boolean;
    updateValidator(newState: boolean): void;
}

function Field(props: FieldProps) {
    const titleIsValid = validators.title;
    const descriptionIsValid = validators.description;

    const [settingsValidator, setSettingsValidator] = useState(true);
    useEffect(() => setSettingsValidator(true), [props.fieldConfig.local_id]);

    function updateFieldConfig(newFieldConfig: configTypes.SurveyField) {
        props.updateValidator(
            titleIsValid(newFieldConfig.title) &&
                descriptionIsValid(newFieldConfig.description) &&
                settingsValidator,
        );
        props.setFieldConfig(newFieldConfig);
    }

    function updateSubfieldConfig(
        newFieldConfig: configTypes.SurveyField,
        subValidation: (fieldConfig: configTypes.SurveyField) => boolean,
    ) {
        const subValidationResult = subValidation(newFieldConfig);
        setSettingsValidator(subValidationResult);
        props.updateValidator(
            titleIsValid(newFieldConfig.title) &&
                descriptionIsValid(newFieldConfig.description) &&
                subValidationResult,
        );
        props.setFieldConfig(newFieldConfig);
    }

    const commonFieldProps = {
        disabled: props.disabled,
        setFieldConfig: updateSubfieldConfig,
    };

    let FieldSettings: React.ReactNode;
    switch (props.fieldConfig.type) {
        case 'Text':
            FieldSettings = (
                // @ts-ignore
                <TextSettings
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Option':
            FieldSettings = (
                // @ts-ignore
                <OptionSettings
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Radio':
            FieldSettings = (
                // @ts-ignore
                <RadioSettings
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Selection':
            FieldSettings = (
                // @ts-ignore
                <SelectionFieldConfigForm
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Email':
            FieldSettings = (
                // @ts-ignore
                <EmailSettings
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        default:
            FieldSettings = (
                <div className='w-full my-4 text-center'>
                    Nothing here yet ...
                </div>
            );
            break;
    }

    return (
        <VisualField
            fieldConfig={props.fieldConfig}
            setFieldConfig={props.setFieldConfig}
            updateFieldConfig={updateFieldConfig}
            disabled={props.disabled}
        >
            {FieldSettings}
        </VisualField>
    );
}

export default Field;
