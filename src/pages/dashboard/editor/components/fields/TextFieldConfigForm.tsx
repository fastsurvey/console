import React from 'react';
import TextInput from '../../../../../components/formFields/TextInput';
import {TextField} from '../../../../../utilities/types';

interface TextFieldConfigFormProps {
    fieldConfig: TextField;
}

function TextFieldConfigForm(props: TextFieldConfigFormProps) {
    return (
        <React.Fragment>
            <div className='flex flex-row items-start mr-8'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Min. Characters:
                </div>
                <TextInput
                    value={props.fieldConfig.min_chars.toString()}
                    onChange={() => {}}
                    flat
                    wrapperClassName='w-28'
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
                    value={props.fieldConfig.max_chars.toString()}
                    onChange={() => {}}
                    flat
                    wrapperClassName='w-28'
                    hint={{
                        text: '<= 2000',
                        fulfilled: props.fieldConfig.max_chars <= 2000,
                    }}
                />
            </div>
        </React.Fragment>
    );
}

export default TextFieldConfigForm;
