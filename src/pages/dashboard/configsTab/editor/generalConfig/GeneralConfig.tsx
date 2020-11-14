import React from 'react';
import DropDown from '../../../../../components/formFields/DropDown';
import TextArea from '../../../../../components/formFields/TextArea';
import TextInput from '../../../../../components/formFields/TextInput';
import {SurveyConfig} from '../../../../../utilities/types';
import {AUTH_MODE} from '../constants';
import DateSelectorRow from './DateSelectorRow';

interface GeneralConfigProps {
    config: SurveyConfig;
    setConfig(config: SurveyConfig): void;
}

function GeneralConfig(props: GeneralConfigProps) {
    const commonProps = {
        disabled: !props.config.draft,
    };
    return (
        <div className='flex flex-col w-full min-h-full pt-4 pb-4 mb-8 border-b-4 border-gray-500'>
            <div className='flex flex-row mb-4'>
                <div className='flex flex-row items-start w-1/2 pr-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Title:
                    </div>
                    <TextInput
                        {...commonProps}
                        flat
                        value={props.config.title}
                        onChange={(newValue: string) => {
                            props.setConfig({
                                ...props.config,
                                ...{title: newValue},
                            });
                        }}
                        placeholder='The title of your survey'
                        hint={{
                            text:
                                'Not empty, max. 120 characters ' +
                                `(${120 - props.config.title.length} left)`,
                            fulfilled:
                                1 <= props.config.title.length &&
                                props.config.title.length <= 120,
                        }}
                        wrapperClassName='self-stretch flex-grow'
                    />
                </div>
                <div className='flex flex-row items-start w-1/2 pl-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Identifier:
                    </div>
                    <TextInput
                        {...commonProps}
                        flat
                        value={props.config.survey_name}
                        onChange={(newValue: string) => {
                            props.setConfig({
                                ...props.config,
                                ...{survey_name: newValue},
                            });
                        }}
                        placeholder='URL conform identifier'
                        hint={{
                            text:
                                'URL-conform, 3-120 ' +
                                `characters (${
                                    120 - props.config.survey_name.length
                                } left)`,
                            fulfilled:
                                props.config.survey_name.match(
                                    /^[a-zA-Z0-9-_]*$/,
                                ) !== null &&
                                3 <= props.config.survey_name.length &&
                                props.config.survey_name.length <= 120,
                        }}
                        wrapperClassName='self-stretch flex-grow'
                    />
                </div>
            </div>
            <div className='flex flex-row items-start w-full mb-4'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Description:
                </div>
                <TextArea
                    {...commonProps}
                    flat
                    value={props.config.description}
                    onChange={(newValue: string) => {
                        props.setConfig({
                            ...props.config,
                            ...{description: newValue},
                        });
                    }}
                    charLimits={{min: 0, max: 2000}}
                    className='leading-8'
                    wrapperClassName='self-stretch flex-grow'
                />
            </div>
            <div className='flex flex-row w-full mb-4'>
                <div className='flex flex-col'>
                    <div className='flex flex-row mb-4'>
                        <div className='h-12 mr-4 text-xl text-right leading-12 font-weight-600'>
                            Authentication:
                        </div>
                        <div className='w-56 mr-2'>
                            <DropDown
                                {...commonProps}
                                value={props.config.mode}
                                onChange={(newValue: 0 | 1 | 2) => {
                                    props.setConfig({
                                        ...props.config,
                                        ...{mode: newValue},
                                    });
                                }}
                                options={AUTH_MODE}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row items-start'>
                        <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                            Submission Limit:
                        </div>
                        <TextInput
                            {...commonProps}
                            flat
                            value={props.config.submission_limit.toString()}
                            onChange={(newValue: string) => {
                                props.setConfig({
                                    ...props.config,
                                    ...{
                                        submission_limit:
                                            newValue.length > 0
                                                ? parseInt(newValue)
                                                : 0,
                                    },
                                });
                            }}
                            wrapperClassName='w-32'
                            hint={{
                                text: '1 - 10.000',
                                fulfilled:
                                    1 <= props.config.submission_limit &&
                                    props.config.submission_limit <= 10000,
                            }}
                        />
                    </div>
                </div>
                <div className='self-stretch flex-grow' />
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center justify-center w-full mb-4'>
                        <div className='h-12 mr-4 text-xl text-right w-14 leading-12 font-weight-600'>
                            Start:
                        </div>
                        <DateSelectorRow
                            {...commonProps}
                            date={new Date(props.config.start * 1000)}
                            setNewTimestamp={(timestamp: number) => {
                                props.setConfig({
                                    ...props.config,
                                    ...{start: timestamp},
                                });
                            }}
                        />
                    </div>
                    <div className='flex flex-row items-center justify-center w-full'>
                        <div className='h-12 mr-4 text-xl text-right w-14 leading-12 font-weight-600'>
                            End:
                        </div>
                        <DateSelectorRow
                            {...commonProps}
                            date={new Date(props.config.end * 1000)}
                            setNewTimestamp={(timestamp: number) => {
                                props.setConfig({
                                    ...props.config,
                                    ...{end: timestamp},
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralConfig;
