import React from 'react';
import {ICONS} from '../../../../../assets/icons/icons';
import DropDown from '../../../../../components/formFields/DropDown';
import TextArea from '../../../../../components/formFields/TextArea';
import TextInput from '../../../../../components/formFields/TextInput';
import {TextField} from '../../../../../utilities/types';

interface TextFieldConfigFormProps {
    fieldConfig: TextField;
}

function TextFieldConfigForm(props: TextFieldConfigFormProps) {
    return (
        <div
            className={
                'w-full bg-gray-100 shadow-outline-gray rounded flex flex-col'
            }
        >
            <div className={'w-full border-b-4 border-gray-300 flex flex-row'}>
                <div className={'flex flex-row'}>
                    <div
                        className={
                            'bg-gray-300 rounded-tl rounded-br h-10 leading-10 font-weight-600 text-xl flex flex-row'
                        }
                    >
                        <div className='w-10 h-10 p-2 cursor-move'>
                            {ICONS.drag}
                        </div>
                        <div className='pr-4'>Text Field</div>
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
            <div className={'p-2 w-full'}>hello</div>
        </div>
    );
}

export default TextFieldConfigForm;
