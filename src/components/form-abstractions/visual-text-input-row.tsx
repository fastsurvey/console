import React from 'react';
import {Label, TextInput} from 'components';
import {configTypes} from 'utilities';

interface Props {
    config: configTypes.SurveyConfig | configTypes.SurveyField;
    label: string;
    value: string;
    hint: {text: string; fulfilled: boolean};
    updateConfig(
        config: configTypes.SurveyConfig | configTypes.SurveyField,
    ): void;
    onChange(newValue: string): any;
    className?: string;
    wrapperClassName?: string;
    placeholder?: string;
    disabled: boolean;
}
const VisualTextInputRow = (props: Props) => (
    <div className={`flex flex-row items-start ${props.className}`}>
        <Label>{props.label}:</Label>
        <TextInput
            disabled={props.disabled}
            flat
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
                props.wrapperClassName
                    ? props.wrapperClassName
                    : 'self-stretch flex-grow'
            }
        />
    </div>
);

export default VisualTextInputRow;
