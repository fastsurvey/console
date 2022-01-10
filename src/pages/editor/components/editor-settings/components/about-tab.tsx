import React from 'react';
import {Label, TextInput} from '/src/components';
import {icons} from '/src/assets';
import {types} from '/src/types';
import {templateUtils} from '/src/utilities';

const AboutTab = (props: {
    configs: types.SurveyConfig[];
    localConfig: types.SurveyConfig;
    setLocalSettingsConfig(configChanges: types.SurveyConfigChange): void;
    disabled: boolean;
}) => (
    <>
        <div className='w-full flex-col-left gap-y-0.5'>
            <Label text='Title' />
            <TextInput
                value={props.localConfig.title}
                setValue={(newValue: string) => {
                    props.setLocalSettingsConfig({
                        title: newValue,
                    });
                }}
                disabled={props.disabled}
                data-cy='input-title'
            />
        </div>
        <div className='w-full flex-col-left gap-y-0.5'>
            <Label
                text='Identifier'
                detail={
                    <>
                        This identifier is used in the URL that you can share with your
                        survey. The survey can be filled out at{' '}
                        <span className='text-blue-100 underline break-all'>
                            https://fastsurvey.de/{'<'}your-username
                            {'>'}/{'<'}survey-identifier{'>'}
                        </span>
                        .
                    </>
                }
            />
            <div className='w-full flex-row-center gap-x-1'>
                <TextInput
                    value={props.localConfig.survey_name}
                    setValue={(newValue: string) => {
                        props.setLocalSettingsConfig({
                            survey_name: newValue,
                        });
                    }}
                    disabled={props.disabled}
                    data-cy='input-identifier'
                />
                <button
                    className={
                        'w-8 h-8 p-1 mx-0.5 rounded ringable svg-settings-generate-id ' +
                        (!props.disabled ? '' : 'cursor-not-allowed ')
                    }
                    onClick={() => {
                        if (!props.disabled) {
                            props.setLocalSettingsConfig({
                                survey_name: templateUtils.surveyName(props.configs),
                            });
                        }
                    }}
                    disabled={props.disabled}
                    data-cy='refresh-identifier'
                >
                    {icons.refresh}
                </button>
            </div>
        </div>
    </>
);

export default AboutTab;
