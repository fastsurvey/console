import React from 'react';
import {connect} from 'react-redux';
import {
    stateTypes,
    configTypes,
    formOptions,
    validators,
    hints,
} from 'utilities';
import {DropDown, TextArea, TextInput, DatePicker, Label} from 'components';
import VisualDatePickerRow from 'pages/configuration/editor/generalConfig/visual-date-picker-row';
import VisualTextInputRow from 'pages/configuration/editor/generalConfig/visual-text-input-row';

interface GeneralConfigProps {
    configs: configTypes.SurveyConfig[] | undefined;
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    updateValidator(newState: boolean): void;
}
function GeneralConfig(props: GeneralConfigProps) {
    const commonProps = {
        disabled: !props.config.draft,
    };

    const titleIsValid = validators.title;
    const surveyNameIsValid = validators.surveyName(
        props.configs,
        props.config,
    );
    const descriptionIsValid = validators.description;
    const submissionLimitIsValid = validators.submissionLimit;

    function updateConfig(newConfig: configTypes.SurveyConfig) {
        props.updateValidator(
            titleIsValid(newConfig.title) &&
                surveyNameIsValid(newConfig.survey_name) &&
                descriptionIsValid(newConfig.description) &&
                submissionLimitIsValid(newConfig.submission_limit),
        );
        props.setConfig(newConfig);
    }

    const commonRowProps = {
        updateConfig,
        setConfig: props.setConfig,
        config: props.config,
    };

    return (
        <div className='flex flex-col w-full min-h-full pt-4 pb-4 mb-8 border-b-4 border-gray-500'>
            <div className='flex flex-row mb-4'>
                <VisualTextInputRow
                    {...commonRowProps}
                    className='w-1/2 pr-4'
                    label='Title'
                    placeholder='The title of your survey'
                    value={props.config.title}
                    onChange={(newValue: string) => ({title: newValue})}
                    hint={hints.title(props.config.title)}
                />
                <VisualTextInputRow
                    {...commonRowProps}
                    className='w-1/2 pl-4'
                    label='Identifier'
                    placeholder='URL conform identifier'
                    value={props.config.survey_name}
                    onChange={(newValue: string) => ({survey_name: newValue})}
                    hint={hints.surveyName(props.config, surveyNameIsValid)}
                />
            </div>
            <div className='flex flex-row items-start w-full mb-4'>
                <Label>Description:</Label>
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
                        <Label>Authentication:</Label>
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
                                options={formOptions.AUTH_MODE}
                            />
                        </div>
                    </div>
                    <VisualTextInputRow
                        {...commonRowProps}
                        wrapperClassname='w-32'
                        label='Submission Limit'
                        value={props.config.submission_limit.toString()}
                        onChange={(newValue: string) => ({
                            submission_limit:
                                newValue.length > 0 ? parseInt(newValue) : 0,
                        })}
                        hint={hints.submissionLimit(props.config)}
                    />
                </div>
                <div className='self-stretch flex-grow' />
                <div className='flex flex-col'>
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
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfig);
