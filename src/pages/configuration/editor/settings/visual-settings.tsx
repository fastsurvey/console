import React from 'react';
import {configTypes, formatters, formOptions, hints} from 'utilities';
import {DropDown, TextArea, TextInput, DatePicker} from 'components';
import EditorFormRow from 'components/layout/editor-form-row';

interface Props {
    config: configTypes.SurveyConfig;
    surveyNameIsValid(survey_name: string): boolean;
    updateConfig(
        config: configTypes.SurveyConfig,
        skipValidation?: boolean,
    ): void;
    updateValidator(newState: boolean): void;
    commonProps: any;
    disabled: boolean;
}
const VisualSettings2 = (props: Props) => {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <div className='flex flex-col items-start w-full mt-8 mb-4 -ml-px overflow-hidden bg-white border-l-4 border-yellow-200 rounded-r rounded-tl shadow-md'>
            <div className='w-full mb-4 mr-px'>
                <div
                    className={
                        'rounded-br h-10 leading-10 font-weight-700 text-xl inline-flex ' +
                        'sm:bg-red-200 md:bg-blue-200 lg:bg-green-200 xl:bg-yellow-200 2xl:bg-red-200 ' +
                        'text-yellow-700 '
                    }
                >
                    <div className='px-3'>General Settings</div>
                </div>
            </div>
            <div className='flex flex-col w-full min-h-full p-2 ml-px'>
                <EditorFormRow label='Title' className='mb-1'>
                    <TextInput
                        {...commonProps}
                        placeholder='The title of your survey'
                        value={props.config.title}
                        onChange={(newValue: string) => {
                            props.updateConfig({
                                ...props.config,
                                title: newValue,
                            });
                        }}
                        hint={hints.title(props.config.title)}
                    />
                </EditorFormRow>

                <EditorFormRow label='Identifier' className='mb-1'>
                    <TextInput
                        {...commonProps}
                        placeholder='URL conform identifier'
                        value={props.config.survey_name}
                        onChange={(newValue: string) => {
                            props.updateConfig({
                                ...props.config,
                                survey_name: newValue,
                            });
                        }}
                        hint={hints.surveyName(
                            props.config,
                            props.surveyNameIsValid,
                        )}
                    />
                </EditorFormRow>

                <EditorFormRow label='Description' className='mb-8'>
                    <TextArea
                        {...commonProps}
                        value={props.config.description}
                        onChange={(newValue: string) => {
                            props.updateConfig({
                                ...props.config,
                                ...{description: newValue},
                            });
                        }}
                        charLimits={{min: 0, max: 2000}}
                    />
                </EditorFormRow>

                <EditorFormRow label='Start' className='mb-2'>
                    <DatePicker
                        {...commonProps}
                        timestamp={props.config.start}
                        setNewTimestamp={(timestamp: number) => {
                            props.updateConfig(
                                {
                                    ...props.config,
                                    start: timestamp,
                                },
                                true,
                            );
                        }}
                    />
                </EditorFormRow>
                <EditorFormRow label='End' className='mb-8'>
                    <DatePicker
                        {...commonProps}
                        timestamp={props.config.end}
                        setNewTimestamp={(timestamp: number) => {
                            props.updateConfig(
                                {
                                    ...props.config,
                                    end: timestamp,
                                },
                                true,
                            );
                        }}
                    />
                </EditorFormRow>

                <EditorFormRow label='Auth Mode' className='mb-2'>
                    <DropDown
                        {...commonProps}
                        value={props.config.mode}
                        onChange={(newValue: 0 | 1 | 2) => {
                            props.updateConfig(
                                {
                                    ...props.config,
                                    mode: newValue,
                                },
                                false,
                            );
                        }}
                        options={formOptions.AUTH_MODE}
                    />
                </EditorFormRow>

                <EditorFormRow label='Limit to' className='mb-0'>
                    <TextInput
                        {...commonProps}
                        postfix=' submissions'
                        value={props.config.submission_limit.toString()}
                        onChange={(newValue: string) => {
                            props.updateConfig({
                                ...props.config,
                                submission_limit: formatters.atoi(newValue),
                            });
                        }}
                        hint={hints.submissionLimit(props.config)}
                    />
                </EditorFormRow>
            </div>
        </div>
    );
};

export default VisualSettings2;
