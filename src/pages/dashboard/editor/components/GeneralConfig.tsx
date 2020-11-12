import React from 'react';
import TextInput from '../../../../components/formFields/TextInput';
import {SurveyConfig} from '../../../../utilities/types';

interface GeneralConfigProps {
    config: SurveyConfig;
}

function GeneralConfig(props: GeneralConfigProps) {
    return (
        <div className='flex flex-col w-full mt-24'>
            <div className='flex flex-row'>
                <div className='flex flex-row items-start w-1/2 h-12 pr-4'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Title:
                    </div>
                    <TextInput
                        value={props.config.title}
                        onChange={() => {}}
                        flat
                        wrapperClassName='self-stretch flex-grow'
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
                            text: "Only characters, numbers and '-' or '_'",
                            fulfilled:
                                props.config.survey_name.match(
                                    /^[a-zA-Z0-9-_]*$/,
                                ) !== null,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default GeneralConfig;
