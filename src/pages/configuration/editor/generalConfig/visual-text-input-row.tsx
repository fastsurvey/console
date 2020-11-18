import React from 'react';
import {Label, TextInput} from 'components';
import {configTypes} from 'utilities';

interface VisualTextInputRowProps {
    config: configTypes.SurveyConfig;
    label: string;
    value: string;
    hint: {text: string; fulfilled: boolean};
    setConfig(config: configTypes.SurveyConfig): void;
    updateConfig(config: configTypes.SurveyConfig): void;
    onChange(newValue: string): any;
    className?: string;
    wrapperClassname?: string;
    placeholder?: string;
}
const VisualTextInputRow = (props: VisualTextInputRowProps) => (
    <div className={`flex flex-row items-start ${props.className}`}>
        <Label>{props.label}:</Label>
        <TextInput
            disabled={!props.config.draft}
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
                props.wrapperClassname
                    ? props.wrapperClassname
                    : 'self-stretch flex-grow'
            }
        />
    </div>
);

export default VisualTextInputRow;
