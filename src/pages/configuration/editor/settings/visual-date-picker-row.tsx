import React from 'react';
import {configTypes} from 'utilities';
import {DatePicker, Label} from 'components';

interface Props {
    config: configTypes.SurveyConfig;
    label: string;
    timestamp: number;
    setConfig(config: configTypes.SurveyConfig): void;
    onChange(timestamp: number): any;
}
const VisualDatePickerRow = (props: Props) => (
    <div className='flex flex-row items-start w-full mb-4'>
        <Label className='w-40% xl:w-30% 2xl:w-20%'>{props.label}:</Label>
        <DatePicker
            disabled={!props.config.draft}
            timestamp={props.timestamp}
            setNewTimestamp={(timestamp: number) => {
                props.setConfig({
                    ...props.config,
                    ...props.onChange(timestamp),
                });
            }}
            className='w-60% xl:w-70% 2xl:w-80%'
        />
    </div>
);

export default VisualDatePickerRow;
