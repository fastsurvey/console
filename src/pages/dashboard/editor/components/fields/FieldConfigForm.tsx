import React from 'react';
import {ICONS} from '../../../../../assets/icons/icons';
import TextArea from '../../../../../components/formFields/TextArea';
import TextInput from '../../../../../components/formFields/TextInput';
import {SurveyField} from '../../../../../utilities/types';
import TextFieldConfigForm from './TextFieldConfigForm';

interface FieldConfigFormProps {
    fieldConfig: SurveyField;
}

function FieldConfigForm(props: FieldConfigFormProps) {
    let FieldSettings: React.ReactNode;

    switch (props.fieldConfig.type) {
        case 'Text':
            FieldSettings = (
                <TextFieldConfigForm fieldConfig={props.fieldConfig} />
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
                            value={props.fieldConfig.title}
                            onChange={() => {}}
                            flat
                            wrapperClassName='self-stretch flex-grow mr-2'
                            placeholder='The title of your survey'
                            hint={{
                                text:
                                    'Not empty, max. 120 characters ' +
                                    `(${
                                        120 - props.fieldConfig.title.length
                                    } left)`,
                                fulfilled:
                                    1 <= props.fieldConfig.title.length &&
                                    props.fieldConfig.title.length <= 120,
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
                            rows={2}
                            value={props.fieldConfig.description}
                            onChange={() => {}}
                            flat
                            charLimits={{min: 0, max: 2000}}
                            wrapperClassName='self-stretch flex-grow mr-2'
                        />
                    </div>
                </div>
            </div>
            <div className={'w-full p-2'}>{FieldSettings}</div>
        </div>
    );
}

export default FieldConfigForm;
