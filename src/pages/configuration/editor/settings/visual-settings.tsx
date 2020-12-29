import React from 'react';
import {configTypes, formatters, formOptions, hints} from 'utilities';
import {
    DropDown,
    TextArea,
    TextInput,
    DatePicker,
    EditorFormCard,
    EditorFormRow,
} from 'components';
import {icons} from 'assets';

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
const VisualSettings = (props: Props) => {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <EditorFormCard
            label='General Settings'
            icon={icons.tune}
            className='z-20 mt-8'
        >
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
                    hint={{
                        ...hints.title(props.config.title),
                        inlineHint: true,
                    }}
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
                    hint={{
                        ...hints.surveyName(
                            props.config,
                            props.surveyNameIsValid,
                        ),
                        inlineHint: true,
                    }}
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
                    hint={{
                        ...hints.submissionLimit(props.config),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
        </EditorFormCard>
    );
};

export default VisualSettings;
