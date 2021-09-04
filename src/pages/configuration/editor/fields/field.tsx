import React, {useEffect} from 'react';
import {clipboardUtils, formUtils, localIdUtils} from '@utilities';
import {types} from '@types';

import VisualField from './visual-field';
import TextSettings from './text-settings/text-settings';
import OptionSettings from './option-settings/option-settings';
import RadioSettings from './radio-settings/radio-settings';
import SelectionSettings from './selection-settings/selection-settings';
import EmailSettings from './email-settings/email-settings';

interface Props {
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
    updateValidation(newState: types.ValidationResult): void;
    validation: types.ValidationResult;
    removeField(): void;
}
function Field(props: Props) {
    useEffect(
        () =>
            props.updateValidation(formUtils.validateField(props.fieldConfig)),
        // eslint-disable-next-line
        [props.fieldConfig.local_id],
    );

    function updateLocalFieldConfig(fieldConfigChanges: object) {
        props.updateValidation(
            formUtils.validateField({
                ...props.fieldConfig,
                ...fieldConfigChanges,
            }),
        );
        props.setLocalFieldConfig(fieldConfigChanges);
    }

    function copyField() {
        clipboardUtils.copy(
            JSON.stringify(localIdUtils.remove.field(props.fieldConfig)),
        );
    }

    let FieldSettings: React.ReactNode;
    switch (props.fieldConfig.type) {
        case 'text':
            FieldSettings = (
                <TextSettings
                    disabled={props.disabled}
                    setLocalFieldConfig={updateLocalFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'option':
            FieldSettings = (
                <OptionSettings
                    disabled={props.disabled}
                    setLocalFieldConfig={updateLocalFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'radio':
            FieldSettings = (
                <RadioSettings
                    disabled={props.disabled}
                    setLocalFieldConfig={updateLocalFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'selection':
            FieldSettings = (
                <SelectionSettings
                    disabled={props.disabled}
                    setLocalFieldConfig={updateLocalFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'email':
            FieldSettings = (
                <EmailSettings
                    disabled={props.disabled}
                    setLocalFieldConfig={updateLocalFieldConfig}
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
            fieldIndex={props.fieldIndex}
            fieldConfig={props.fieldConfig}
            setLocalFieldConfig={updateLocalFieldConfig}
            disabled={props.disabled}
            removeField={props.removeField}
            copyField={copyField}
            validation={props.validation}
        >
            {FieldSettings}
        </VisualField>
    );
}

export default Field;
