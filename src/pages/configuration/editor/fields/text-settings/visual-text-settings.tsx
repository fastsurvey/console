import React from 'react';
import {formUtils} from 'utilities';
import {LabelSimple, TextInputSimple} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.TextField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualTextSettings(props: Props) {
    return (
        <>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Minimum' />
                <TextInputSimple
                    value={props.fieldConfig.min_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_chars: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    postfix=' characters'
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Maximum' />
                <TextInputSimple
                    value={props.fieldConfig.max_chars.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            max_chars: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    postfix=' characters'
                />
            </div>
        </>
    );
}

export default VisualTextSettings;
