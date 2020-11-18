import React from 'react';
import {configTypes} from 'utilities';
import {TextInput} from 'components';
import {validators} from 'utilities';
import FieldOptionsList from '../field-options-list/field-options-list';

interface SelectionSettingsProps {
    fieldConfig: configTypes.SelectionField;
    setFieldConfig(
        fieldConfig: configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.SelectionField) => boolean,
    ): void;
    disabled: boolean;
}
function SelectionSettings(props: SelectionSettingsProps) {
    const minSelectIsValid = validators.minSelect;
    const maxSelectIsValid = validators.maxSelect;
    const titleIsValid = validators.title;

    function updateFieldConfig(newFieldConfig: configTypes.SelectionField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.SelectionField) =>
                newFieldConfig.fields.every((optionField) =>
                    titleIsValid(optionField.title),
                ) &&
                minSelectIsValid(newFieldConfig) &&
                maxSelectIsValid(newFieldConfig),
        );
    }

    const commonSelectionProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mb-2'>
                <div className='flex flex-row items-start mr-8'>
                    <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                        Min. Selection:
                    </div>
                    <TextInput
                        {...commonSelectionProps}
                        value={props.fieldConfig.min_select.toString()}
                        onChange={(newValue: string) =>
                            updateFieldConfig({
                                ...props.fieldConfig,
                                min_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={{
                            text: '<= max select.',
                            fulfilled: minSelectIsValid(props.fieldConfig),
                        }}
                    />
                </div>
                <div className='flex flex-row items-start mr-8'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Max. Selection:
                    </div>
                    <TextInput
                        {...commonSelectionProps}
                        value={props.fieldConfig.max_select.toString()}
                        onChange={(newValue: string) =>
                            updateFieldConfig({
                                ...props.fieldConfig,
                                max_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={{
                            text: `<= ${props.fieldConfig.fields.length}`,
                            fulfilled: maxSelectIsValid(props.fieldConfig),
                        }}
                    />
                </div>
            </div>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                updateFieldConfig={updateFieldConfig}
            />
        </div>
    );
}

export default SelectionSettings;
