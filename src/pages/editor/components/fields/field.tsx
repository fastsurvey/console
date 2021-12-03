import React, {useEffect} from 'react';
import {clipboardUtils, formUtils, localIdUtils} from '/src/utilities';
import {types} from '/src/types';

import VisualField from './visual-field';
import TextSettings from './text-settings/text-settings';
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
        () => props.updateValidation(formUtils.validateField(props.fieldConfig)),
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
            JSON.stringify(localIdUtils.remove.fieldForClipboard(props.fieldConfig)),
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
            throw 'Invalid field';
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
