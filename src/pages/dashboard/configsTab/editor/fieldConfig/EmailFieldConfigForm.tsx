import React from 'react';
import TextInput from '../../../../../components/formFields/TextInput';
import {EmailField} from '../../../../../utilities/types';

interface EmailFieldConfigFormProps {
    fieldConfig: EmailField;
    setFieldConfig(
        fieldConfig: EmailField,
        subValidation: (fieldConfig: EmailField) => boolean,
    ): void;
    disabled: boolean;
}

function EmailFieldConfigForm(props: EmailFieldConfigFormProps) {
    const hintIsValid = (hint: string) => hint.length <= 120;

    function updateFieldConfig(newFieldConfig: EmailField) {
        props.setFieldConfig(newFieldConfig, (newFieldConfig: EmailField) =>
            hintIsValid(newFieldConfig.hint),
        );
    }

    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col w-50'></div>
            <div className='flex flex-col flex-max'>
                <div className='flex flex-row items-start mb-2'>
                    <div className='h-12 mx-3 text-xl text-right w-18 font-weight-600 leading-12'>
                        Regex:
                    </div>
                    <TextInput
                        {...commonProps}
                        wrapperClassName={'w-full flex-max'}
                        className={'w-full flex-max'}
                        value={props.fieldConfig.regex}
                        onChange={(newValue: string) =>
                            updateFieldConfig({
                                ...props.fieldConfig,
                                regex: newValue,
                            })
                        }
                    />
                </div>
                <div className='flex flex-row items-start'>
                    <div className='h-12 mx-3 text-xl text-right w-18 font-weight-600 leading-12'>
                        Hint:
                    </div>
                    <TextInput
                        {...commonProps}
                        wrapperClassName={'w-full flex-max'}
                        value={props.fieldConfig.hint}
                        onChange={(newValue: string) =>
                            updateFieldConfig({
                                ...props.fieldConfig,
                                hint: newValue,
                            })
                        }
                        hint={{
                            text: `<= 120 Characters (${
                                120 - props.fieldConfig.hint.length
                            } left)`,
                            fulfilled: hintIsValid(props.fieldConfig.hint),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailFieldConfigForm;
