import React, {useEffect, useState} from 'react';
import {ICONS} from '../../../../../assets/icons/icons';
import TextArea from '../../../../../components/formFields/TextArea';
import TextInput from '../../../../../components/formFields/TextInput';
import {SurveyField} from '../../../../../utilities/types';
import TextFieldConfigForm from './TextFieldConfigForm';

interface FieldConfigFormProps {
    fieldConfig: SurveyField;
    setFieldConfig(fieldConfig: SurveyField): void;
    disabled: boolean;
    updateValidator(newState: boolean): void;
}

function FieldConfigForm(props: FieldConfigFormProps) {
    const titleIsValid = (title: string) =>
        1 <= title.length && title.length <= 120;
    const descriptionIsValid = (description: string) =>
        description.length <= 2000;

    const [settingsValidator, setSettingsValidator] = useState(true);
    useEffect(() => setSettingsValidator(true), [props.fieldConfig.local_id]);

    function updateFieldConfig(newFieldConfig: SurveyField) {
        props.updateValidator(
            titleIsValid(newFieldConfig.title) &&
                descriptionIsValid(newFieldConfig.description) &&
                settingsValidator,
        );
        props.setFieldConfig(newFieldConfig);
    }

    function updateSubfieldConfig(
        newFieldConfig: SurveyField,
        subValidation: (fieldConfig: SurveyField) => boolean,
    ) {
        const subValidationResult = subValidation(newFieldConfig);
        setSettingsValidator(subValidationResult);
        props.updateValidator(
            titleIsValid(newFieldConfig.title) &&
                descriptionIsValid(newFieldConfig.description) &&
                subValidationResult,
        );
        props.setFieldConfig(newFieldConfig);
    }

    const commonFieldProps = {
        disabled: props.disabled,
        setFieldConfig: updateSubfieldConfig,
    };
    const commonInputProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'self-stretch flex-grow mr-2',
    };

    let FieldSettings: React.ReactNode;
    switch (props.fieldConfig.type) {
        case 'Text':
            FieldSettings = (
                // @ts-ignore
                <TextFieldConfigForm
                    {...commonFieldProps}
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
        <div
            className={
                'w-full bg-gray-100 shadow-outline-gray rounded flex flex-col mb-4'
            }
        >
            <div
                className={'w-full border-gray-300 flex flex-row'}
                style={{borderBottomWidth: '2px'}}
            >
                <div className={'flex flex-row w-40'}>
                    <div
                        className={
                            'bg-gray-300 rounded-tl rounded-br h-10 leading-10 font-weight-700 text-xl flex flex-row'
                        }
                    >
                        <div className='w-10 h-10 p-2 cursor-move'>
                            {ICONS.drag}
                        </div>
                        <div className='pr-4'>{props.fieldConfig.type}</div>
                    </div>
                </div>
                <div className='flex flex-col self-stretch flex-grow'>
                    <div
                        className='flex flex-row items-start w-full pt-2 '
                        style={{paddingBottom: 'calc(0.5rem + 2px)'}}
                    >
                        <div className='h-12 mx-3 text-xl text-right w-28 leading-12 font-weight-600'>
                            Title:
                        </div>
                        <TextInput
                            {...commonInputProps}
                            value={props.fieldConfig.title}
                            onChange={(newValue: string) =>
                                updateFieldConfig({
                                    ...props.fieldConfig,
                                    title: newValue,
                                })
                            }
                            placeholder='The title of your survey'
                            hint={{
                                text:
                                    'Not empty, max. 120 characters ' +
                                    `(${
                                        120 - props.fieldConfig.title.length
                                    } left)`,
                                fulfilled: titleIsValid(
                                    props.fieldConfig.title,
                                ),
                            }}
                        />
                    </div>
                    <div
                        className='flex flex-row items-start w-full'
                        style={{paddingBottom: 'calc(0.25rem - 2px)'}}
                    >
                        <div className='h-12 mx-3 text-xl text-right w-28 font-weight-600 leading-12'>
                            Description:
                        </div>
                        <TextArea
                            {...commonInputProps}
                            rows={2}
                            value={props.fieldConfig.description}
                            onChange={(newValue: string) =>
                                updateFieldConfig({
                                    ...props.fieldConfig,
                                    description: newValue,
                                })
                            }
                            charLimits={{min: 0, max: 2000}}
                        />
                    </div>
                </div>
            </div>
            <div className={'w-full p-2'}>{FieldSettings}</div>
        </div>
    );
}

export default FieldConfigForm;
