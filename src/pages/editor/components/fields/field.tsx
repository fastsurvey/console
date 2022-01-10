import React, {useState} from 'react';
import {clipboardUtils, localIdUtils} from '/src/utilities';
import {types} from '/src/types';

import VisualField from './visual-field';
import TextSettings from './text/text-settings';
import SelectionSettings from './selection/selection-settings';
import EmailSettings from './email/email-settings';

function Field(props: {
    identifierToOrder: {[key: string]: number};
    fieldIndex: number;

    localFieldConfig: types.SurveyField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    removeField(): void;
    validation: types.ValidationResult;

    configIsDiffering: boolean;
    disabled: boolean;
}) {
    const [collapse, setCollapse] = useState(!props.configIsDiffering);

    function copyField() {
        clipboardUtils.copy(
            JSON.stringify(
                localIdUtils.remove.fieldForClipboard(props.localFieldConfig),
            ),
        );
    }

    let FieldSettings: React.ReactNode;
    switch (props.localFieldConfig.type) {
        case 'text':
            FieldSettings = (
                <TextSettings
                    disabled={props.disabled || collapse}
                    setLocalFieldConfig={props.setLocalFieldConfig}
                    localFieldConfig={props.localFieldConfig}
                />
            );
            break;
        case 'selection':
            FieldSettings = (
                <SelectionSettings
                    disabled={props.disabled || collapse}
                    setLocalFieldConfig={props.setLocalFieldConfig}
                    localFieldConfig={props.localFieldConfig}
                />
            );
            break;
        case 'email':
            FieldSettings = (
                <EmailSettings
                    disabled={props.disabled || collapse}
                    setLocalFieldConfig={props.setLocalFieldConfig}
                    localFieldConfig={props.localFieldConfig}
                />
            );
            break;
        case 'markdown':
        case 'break':
            break;
        default:
            throw `Invalid field: ${props.localFieldConfig}`;
    }

    return (
        <VisualField
            identifierToOrder={props.identifierToOrder}
            fieldIndex={props.fieldIndex}
            localFieldConfig={props.localFieldConfig}
            setLocalFieldConfig={props.setLocalFieldConfig}
            disabled={props.disabled}
            removeField={props.removeField}
            copyField={copyField}
            validation={props.validation}
            configIsDiffering={props.configIsDiffering}
            collapse={collapse}
            setCollapse={setCollapse}
        >
            {FieldSettings}
        </VisualField>
    );
}

export default Field;
