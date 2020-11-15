import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DropDown from '../../../../../components/formFields/DropDown';
import TextArea from '../../../../../components/formFields/TextArea';
import TextInput from '../../../../../components/formFields/TextInput';
import {ReduxState, SurveyConfig} from '../../../../../utilities/types';
import {AUTH_MODE} from '../constants';
import DateSelectorRow from './DateSelectorRow';

interface GeneralConfigProps {
    configs: SurveyConfig[] | undefined;
    config: SurveyConfig;
    setConfig(config: SurveyConfig): void;
    updateValidator(newState: boolean): void;
}

function GeneralConfig(props: GeneralConfigProps) {
    const commonProps = {
        disabled: !props.config.draft,
    };

    const [valid, setValid] = useState(true);
    const titleIsValid = (title: string) =>
        1 <= title.length && title.length <= 120;
    const surveyNameIsValid = (survey_name: string) =>
        survey_name.match(/^[a-zA-Z0-9-_]*$/) !== null &&
        3 <= survey_name.length &&
        survey_name.length <= 120 &&
        props.configs?.filter(
            (config) =>
                config.local_id !== props.config.local_id &&
                config.survey_name === survey_name,
        ).length === 0;
    const descriptionIsValid = (description: string) =>
        description.length <= 2000;
    const submissionLimitIsValid = (submission_limit: number) =>
        1 <= submission_limit && submission_limit <= 10000;

    useEffect(() => {
        setValid(true);
    }, [props.config.local_id]);

    useEffect(() => {
        props.updateValidator(valid);
    }, [valid]);

    function updateConfig(newConfig: SurveyConfig) {
        props.updateValidator(
            titleIsValid(newConfig.title) &&
                surveyNameIsValid(newConfig.survey_name) &&
                descriptionIsValid(newConfig.description) &&
                submissionLimitIsValid(newConfig.submission_limit),
        );
        props.setConfig(newConfig);
    }

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
                            updateConfig({
                                ...props.config,
                                ...{title: newValue},
                            });
                        }}
                        placeholder='The title of your survey'
                        hint={{
                            text:
                                'Not empty, max. 120 characters ' +
                                `(${120 - props.config.title.length} left)`,
                            fulfilled: titleIsValid(props.config.title),
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
                            updateConfig({
                                ...props.config,
                                ...{survey_name: newValue},
                            });
                        }}
                        placeholder='URL conform identifier'
                        hint={{
                            text:
                                'URL-safe, unique, 3-120 ' +
                                `characters (${
                                    120 - props.config.survey_name.length
                                } left)`,
                            fulfilled: surveyNameIsValid(
                                props.config.survey_name,
                            ),
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
                        updateConfig({
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
                                updateConfig({
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
                                fulfilled: submissionLimitIsValid(
                                    props.config.submission_limit,
                                ),
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
const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfig);
