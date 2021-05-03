import React from 'react';
import {Label, TextInput} from 'components';
import {types} from 'types';

interface Props {
    config: types.SurveyConfig | types.SurveyField;
    label: string;
    postfix?: string;
    value: string;
    hint: {text: string; fulfilled: boolean};
    updateConfig(config: types.SurveyConfig | types.SurveyField): void;
    onChange(newValue: string): any;
    className?: string;
    wrapperClassName?: string;
    placeholder?: string;
    disabled: boolean;
}
const VisualTextInputRow = (props: Props) => (
    <div className={'flex flex-row items-start w-full'}>
        <Label className='w-40% xl:w-30% 2xl:w-20%'>{props.label}:</Label>
        <TextInput
            disabled={props.disabled}
            flat
            postfix={props.postfix}
            value={props.value}
            onChange={(newValue: string) => {
                props.updateConfig({
                    ...props.config,
                    ...props.onChange(newValue),
                });
            }}
            placeholder={props.placeholder}
            hint={props.hint}
            wrapperClassName={
                'w-60% xl:w-70% 2xl:w-80% ' +
                (props.wrapperClassName
                    ? props.wrapperClassName
                    : 'self-stretch flex-grow')
            }
        />
    </div>
);

export default VisualTextInputRow;
