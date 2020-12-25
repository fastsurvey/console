import React from 'react';
import {configTypes, formatters, formOptions, hints} from 'utilities';
import {DropDown, TextArea, Label, VisualTextInputRow} from 'components';
import VisualDatePickerRow from './visual-date-picker-row';
import {ControlPanelImage} from 'assets';

interface Props {
    config: configTypes.SurveyConfig;
    surveyNameIsValid(survey_name: string): boolean;
    updateConfig(config: configTypes.SurveyConfig): void;
    setConfig(config: configTypes.SurveyConfig): void;
    updateValidator(newState: boolean): void;
    commonProps: any;
}
const VisualSettings2 = (props: Props) => (
    <div className='flex flex-row items-start w-full my-8 border-l-4 border-blue-300'>
        <div className='w-20%'>
            <div className='pl-2 text-2xl text-blue-300 font-weight-600'>
                General Settings
            </div>
        </div>
        <div className='flex flex-col w-80% min-h-full'>
            <VisualTextInputRow
                {...props.commonProps}
                label='Title'
                placeholder='The title of your survey'
                value={props.config.title}
                onChange={(newValue: string) => ({title: newValue})}
                hint={hints.title(props.config.title)}
            />
            <VisualTextInputRow
                {...props.commonProps}
                label='Identifier'
                placeholder='URL conform identifier'
                value={props.config.survey_name}
                onChange={(newValue: string) => ({survey_name: newValue})}
                hint={hints.surveyName(props.config, props.surveyNameIsValid)}
            />
            <div className='flex flex-row items-start w-full mb-8'>
                <Label className='w-20%'>Description:</Label>
                <TextArea
                    {...props.commonProps}
                    flat
                    value={props.config.description}
                    onChange={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            ...{description: newValue},
                        });
                    }}
                    charLimits={{min: 0, max: 2000}}
                    className='leading-8 w-80%'
                    wrapperClassName='self-stretch flex-grow'
                />
            </div>

            <VisualDatePickerRow
                label='Start'
                config={props.config}
                setConfig={props.setConfig}
                timestamp={props.config.start}
                onChange={(timestamp: number) => ({start: timestamp})}
            />
            <VisualDatePickerRow
                label='End'
                config={props.config}
                setConfig={props.setConfig}
                timestamp={props.config.end}
                onChange={(timestamp: number) => ({end: timestamp})}
            />

            <div className={'flex flex-row items-start w-full mt-8 mb-2'}>
                <Label className='w-20%'>Authentication:</Label>
                <div className='w-80%'>
                    <DropDown
                        {...props.commonProps}
                        value={props.config.mode}
                        onChange={(newValue: 0 | 1 | 2) => {
                            props.setConfig({
                                ...props.config,
                                ...{mode: newValue},
                            });
                        }}
                        options={formOptions.AUTH_MODE}
                    />
                </div>
            </div>

            <VisualTextInputRow
                {...props.commonProps}
                label='Submission Limit'
                value={props.config.submission_limit.toString()}
                onChange={(newValue: string) => ({
                    submission_limit: formatters.atoi(newValue),
                })}
                hint={hints.submissionLimit(props.config)}
            />
        </div>
    </div>
);

export default VisualSettings2;
