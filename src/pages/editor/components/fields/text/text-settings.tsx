import React from 'react';
import {helperUtils} from '/src/utilities';
import {Label, TextInput} from '/src/components';
import {types} from '/src/types';

function TextSettings(props: {
    localFieldConfig: types.TextField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}) {
    return (
        <>
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Minimum' />
                <TextInput
                    value={props.localFieldConfig.min_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_chars: helperUtils.formatAtoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    postfix=' characters'
                    data-cy='input-min-chars'
                />
            </div>
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Maximum' />
                <TextInput
                    value={props.localFieldConfig.max_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            max_chars: helperUtils.formatAtoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    postfix=' characters'
                    data-cy='input-max-chars'
                />
            </div>
        </>
    );
}

export default TextSettings;
