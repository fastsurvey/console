import React from 'react';
import TextInput from '../../../../../components/formFields/TextInput';
import configTypes from '../../../../../utilities/types/configTypes';

interface TextFieldConfigFormProps {
    fieldConfig: configTypes.TextField;
    setFieldConfig(
        fieldConfig: configTypes.TextField,
        subValidation: (fieldConfig: configTypes.TextField) => boolean,
    ): void;
    disabled: boolean;
}

function TextFieldConfigForm(props: TextFieldConfigFormProps) {
    const minCharsIsValid = (min_chars: number) =>
        0 <= min_chars && min_chars <= props.fieldConfig.max_chars;

    const maxCharsIsValid = (max_chars: number) => max_chars <= 2000;

    function updateFieldConfig(newFieldConfig: configTypes.TextField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.TextField) =>
                minCharsIsValid(newFieldConfig.min_chars) &&
                maxCharsIsValid(newFieldConfig.max_chars),
        );
    }

    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                    Min. Characters:
                </div>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.min_chars.toString()}
                    onChange={(newValue: string) =>
                        updateFieldConfig({
                            ...props.fieldConfig,
                            min_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={{
                        text: '<= max char.',
                        fulfilled: minCharsIsValid(props.fieldConfig.min_chars),
                    }}
                />
            </div>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Max. Characters:
                </div>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.max_chars.toString()}
                    onChange={(newValue: string) =>
                        updateFieldConfig({
                            ...props.fieldConfig,
                            max_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={{
                        text: '<= 2000',
                        fulfilled: maxCharsIsValid(props.fieldConfig.max_chars),
                    }}
                />
            </div>
        </div>
    );
}

export default TextFieldConfigForm;
