import React from 'react';
import TextArea from '../../../../components/formFields/TextArea';
import TextInput from '../../../../components/formFields/TextInput';
import {SurveyConfig} from '../../../../utilities/types';

interface GeneralConfigProps {
    config: SurveyConfig;
}

function GeneralConfig(props: GeneralConfigProps) {
    return (
        <div className='flex flex-col w-full mt-24'>
            <div className='flex flex-row mb-4'>
                <div className='flex flex-row items-start w-1/2 pr-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Title:
                    </div>
                    <TextInput
                        value={props.config.title}
                        onChange={() => {}}
                        flat
                        wrapperClassName='self-stretch flex-grow'
                        placeholder='The title of your survey'
                        hint={{
                            text:
                                'Not empty, max. 120 characters ' +
                                `(${120 - props.config.title.length} left)`,
                            fulfilled:
                                1 <= props.config.title.length &&
                                props.config.title.length <= 120,
                        }}
                    />
                </div>
                <div className='flex flex-row items-start w-1/2 pl-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Identifier:
                    </div>
                    <TextInput
                        value={props.config.survey_name}
                        onChange={() => {}}
                        flat
                        wrapperClassName='self-stretch flex-grow'
                        placeholder='URL conform identifier'
                        hint={{
                            text:
                                'URL-conform, 3-120 ' +
                                `characters (${
                                    120 - props.config.title.length
                                } left)`,
                            fulfilled:
                                props.config.survey_name.match(
                                    /^[a-zA-Z0-9-_]*$/,
                                ) !== null &&
                                3 <= props.config.title.length &&
                                props.config.title.length <= 120,
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-row items-start w-full h-32'>
                <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                    Description:
                </div>
                <TextArea
                    value={props.config.title}
                    onChange={() => {}}
                    flat
                    charLimits={{min: 0, max: 500}}
                    className='leading-8'
                    wrapperClassName='self-stretch flex-grow'
                />
            </div>
        </div>
    );
}

export default GeneralConfig;
