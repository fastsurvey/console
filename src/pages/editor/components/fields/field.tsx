import React, {useEffect} from 'react';
import {clipboardUtils, formUtils, localIdUtils} from '/src/utilities';
import {types} from '/src/types';

import VisualField from './visual-field';
import TextSettings from './text/text-settings';
import SelectionSettings from './selection/selection-settings';
import EmailSettings from './email/email-settings';

interface Props {
    identifierToOrder: {[key: string]: number};
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    configIsDiffering: boolean;
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
        case 'break':
        case 'markdown':
            break;
        default:
            throw `Invalid field: ${props.fieldConfig}`;
    }

    return (
        <VisualField
            identifierToOrder={props.identifierToOrder}
            fieldIndex={props.fieldIndex}
            fieldConfig={props.fieldConfig}
            setLocalFieldConfig={updateLocalFieldConfig}
            disabled={props.disabled}
            removeField={props.removeField}
            copyField={copyField}
            validation={props.validation}
            configIsDiffering={props.configIsDiffering}
        >
            {FieldSettings}
        </VisualField>
    );
}

export default Field;
