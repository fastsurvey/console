import React, {useEffect, useState} from 'react';
import {configTypes} from 'utilities';

import TextFieldConfigForm from '../TextFieldConfigForm';
import OptionFieldConfigForm from '../OptionFieldConfigForm';
import RadioFieldConfigForm from '../RadioFieldConfigForm';
import SelectionFieldConfigForm from '../SelectionFieldConfigForm';
import EmailFieldConfigForm from '../EmailFieldConfigForm';
import VisualField from './visual-field';

interface FieldProps {
    fieldConfig: configTypes.SurveyField;
    setFieldConfig(fieldConfig: configTypes.SurveyField): void;
    disabled: boolean;
    updateValidator(newState: boolean): void;
}

function Field(props: FieldProps) {
    const titleIsValid = (title: string) =>
        1 <= title.length && title.length <= 120;
    const descriptionIsValid = (description: string) =>
        description.length <= 2000;

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
                <TextFieldConfigForm
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Option':
            FieldSettings = (
                // @ts-ignore
                <OptionFieldConfigForm
                    {...commonFieldProps}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Radio':
            FieldSettings = (
                // @ts-ignore
                <RadioFieldConfigForm
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
                <EmailFieldConfigForm
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
