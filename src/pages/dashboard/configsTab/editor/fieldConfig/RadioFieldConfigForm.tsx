import React from 'react';
import Checkbox from '../../../../../components/formFields/Checkbox';
import TextInput from '../../../../../components/formFields/TextInput';
import {TextField, RadioField} from '../../../../../utilities/types';

interface RadioFieldConfigFormProps {
    fieldConfig: RadioField;
    setFieldConfig(
        fieldConfig: RadioField,
        subValidation: (fieldConfig: RadioField) => boolean,
    ): void;
    disabled: boolean;
}

function RadioFieldConfigForm(props: RadioFieldConfigFormProps) {
    const titleIsValid = (title: string) =>
        1 <= title.length && title.length <= 120;

    function updateFieldConfig(newFieldConfig: RadioField) {
        props.setFieldConfig(newFieldConfig, (newFieldConfig: RadioField) =>
            newFieldConfig.fields.every((optionField) =>
                titleIsValid(optionField.title),
            ),
        );
    }

    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-full',
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row w-full'>
                <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                    Options:
                </div>
                <div className='flex flex-col w-full gap-y-2'>
                    {props.fieldConfig.fields.map(
                        (optionField, optionIndex) => (
                            <TextInput
                                {...commonProps}
                                value={optionField.title}
                                onChange={(newValue: string) =>
                                    updateFieldConfig({
                                        ...props.fieldConfig,
                                        fields: props.fieldConfig.fields.map(
                                            (oldOptionField, oldIndex) =>
                                                optionIndex === oldIndex
                                                    ? {
                                                          ...oldOptionField,
                                                          title: newValue,
                                                      }
                                                    : oldOptionField,
                                        ),
                                    })
                                }
                                hint={{
                                    text:
                                        'Not empty, max. 120 characters ' +
                                        `(${
                                            120 - optionField.title.length
                                        } left)`,
                                    fulfilled: titleIsValid(optionField.title),
                                }}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default RadioFieldConfigForm;
