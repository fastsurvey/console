import React from 'react';
import TextInput from '../../../../../components/formFields/TextInput';
import {SurveyField, TextField} from '../../../../../utilities/types';

interface TextFieldConfigFormProps {
    fieldConfig: TextField;
    setFieldConfig(fieldConfig: TextField): void;
    disabled: boolean;
}

function TextFieldConfigForm(props: TextFieldConfigFormProps) {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Min. Characters:
                </div>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.min_chars.toString()}
                    onChange={(newValue: string) =>
                        props.setFieldConfig({
                            ...props.fieldConfig,
                            min_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={{
                        text: '<= max char.',
                        fulfilled:
                            0 <= props.fieldConfig.min_chars &&
                            props.fieldConfig.min_chars <=
                                props.fieldConfig.max_chars,
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
                        props.setFieldConfig({
                            ...props.fieldConfig,
                            max_chars:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })
                    }
                    hint={{
                        text: '<= 2000',
                        fulfilled: props.fieldConfig.max_chars <= 2000,
                    }}
                />
            </div>
        </div>
    );
}

export default TextFieldConfigForm;
