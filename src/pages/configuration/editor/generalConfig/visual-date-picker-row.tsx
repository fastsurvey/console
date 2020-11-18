import React from 'react';
import {configTypes} from 'utilities';
import {DatePicker, Label} from 'components';

interface VisualDatePickerRowProps {
    config: configTypes.SurveyConfig;
    label: string;
    timestamp: number;
    setConfig(config: configTypes.SurveyConfig): void;
    onChange(timestamp: number): any;
}
const VisualDatePickerRow = (props: VisualDatePickerRowProps) => (
    <div className='flex flex-row items-center justify-center w-full mb-4'>
        <Label className='w-14'>{props.label}:</Label>
        <DatePicker
            disabled={!props.config.draft}
            timestamp={props.timestamp}
            setNewTimestamp={(timestamp: number) => {
                props.setConfig({
                    ...props.config,
                    ...props.onChange(timestamp),
                });
            }}
        />
    </div>
);

export default VisualDatePickerRow;
