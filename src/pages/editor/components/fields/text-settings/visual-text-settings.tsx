import React from 'react';
import {formUtils} from '/src/utilities';
import {Label, TextInput} from '/src/components';
import {types} from '/src/types';

interface Props {
    fieldConfig: types.TextField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualTextSettings(props: Props) {
    return (
        <>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Minimum' />
                <TextInput
                    value={props.fieldConfig.min_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_chars: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    postfix=' characters'
                    data-cy='input-min-chars'
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Maximum' />
                <TextInput
                    value={props.fieldConfig.max_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            max_chars: formUtils.formatters.atoi(newValue),
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

export default VisualTextSettings;
