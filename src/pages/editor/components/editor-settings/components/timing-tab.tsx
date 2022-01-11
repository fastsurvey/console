import React from 'react';
import {Label, DatePicker, Toggle} from '/src/components';
import {types} from '/src/types';

const TimingTab = (props: {
    localConfig: types.SurveyConfig;
    setLocalSettingsConfig(configChanges: types.SurveyConfigChange): void;
    disabled: boolean;
}) => (
    <>
        <div className='w-full flex-col-left gap-y-0.5'>
            <Label text='Open for new submissions' />
            <Toggle
                value={props.localConfig.start !== null}
                setValue={(v: boolean) => {
                    props.setLocalSettingsConfig({
                        start: v ? 0 : null,
                        end: v ? props.localConfig.end : null,
                    });
                }}
                disabled={props.disabled}
                data-cy='toggle-open-for-submissions'
            />
        </div>

        {props.localConfig.start !== null && (
            <>
                <div className='w-full flex-col-left gap-y-0.5'>
                    <Label text='Start time' />

                    <DatePicker
                        timestamp={props.localConfig.start}
                        setTimestamp={(timestamp: number | null) => {
                            props.setLocalSettingsConfig({
                                start: timestamp,
                            });
                        }}
                        disabled={props.disabled}
                        data-cy='datepicker-start'
                        type='start'
                    />
                </div>

                <div className='w-full flex-col-left gap-y-0.5'>
                    <Label text='End time' />
                    <DatePicker
                        timestamp={props.localConfig.end}
                        setTimestamp={(timestamp: number | null) => {
                            props.setLocalSettingsConfig({
                                end: timestamp,
                            });
                        }}
                        disabled={props.disabled}
                        data-cy='datepicker-end'
                        type='end'
                    />
                </div>
            </>
        )}
    </>
);

export default TimingTab;
