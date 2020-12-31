import React, {useEffect} from 'react';
import {
    configTypes,
    copyToClipboard,
    removeLocalIds,
    validateField,
} from 'utilities';

import VisualField from './visual-field';
import TextSettings from '../text-settings/text-settings';
import OptionSettings from '../option-settings/option-settings';
import RadioSettings from '../radio-settings/radio-settings';
import SelectionSettings from '../selection-settings/selection-settings';
import EmailSettings from '../email-settings/email-settings';

interface Props {
    fieldConfig: configTypes.SurveyField;
    setFieldConfig(fieldConfig: configTypes.SurveyField): void;
    disabled: boolean;
    updateValidator(newState: boolean): void;
    removeField(): void;
}
function Field(props: Props) {
    useEffect(() => props.updateValidator(validateField(props.fieldConfig)), [
        props.fieldConfig.local_id,
    ]);

    function updateFieldConfig(newFieldConfig: configTypes.SurveyField) {
        props.updateValidator(validateField(newFieldConfig));
        props.setFieldConfig(newFieldConfig);
    }

    function copyField() {
        copyToClipboard(
            JSON.stringify(
                removeLocalIds.field(
                    JSON.parse(JSON.stringify(props.fieldConfig)),
                ),
            ),
        );
    }

    let FieldSettings: React.ReactNode;
    switch (props.fieldConfig.type) {
        case 'Text':
            FieldSettings = (
                <TextSettings
                    disabled={props.disabled}
                    setFieldConfig={updateFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Option':
            FieldSettings = (
                <OptionSettings
                    disabled={props.disabled}
                    setFieldConfig={updateFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Radio':
            FieldSettings = (
                <RadioSettings
                    disabled={props.disabled}
                    setFieldConfig={updateFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Selection':
            FieldSettings = (
                <SelectionSettings
                    disabled={props.disabled}
                    setFieldConfig={updateFieldConfig}
                    fieldConfig={props.fieldConfig}
                />
            );
            break;
        case 'Email':
            FieldSettings = (
                <EmailSettings
                    disabled={props.disabled}
                    setFieldConfig={updateFieldConfig}
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
            removeField={props.removeField}
            copyField={copyField}
        >
            {FieldSettings}
        </VisualField>
    );
}

export default Field;
