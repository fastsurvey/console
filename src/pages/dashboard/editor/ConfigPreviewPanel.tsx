import React from 'react';
import {SurveyConfig} from '../../../utilities/types';
import {ICONS} from '../../../assets/icons/icons';

interface ConfigPreviewPanelProps {
    config: SurveyConfig;
    index: number;
}

function ConfigPreviewPanel(props: ConfigPreviewPanelProps) {
    let statusColor: string;
    let statusText: string;

    if (props.config.draft) {
        statusColor = 'gray-500';
        statusText = 'Draft';
    } else {
        statusColor = 'green-500';
        statusText = 'Running';
    }

    return (
        <div
            className={
                'w-full p-2 my-1 bg-white rounded-l shadow ' +
                'border-r-4 border-' +
                statusColor
            }
        >
            <div className='flex flex-row items-center w-full h-8'>
                <div className='text-lg font-weight-600'>
                    {props.config.title}
                </div>
                <div className={'self-stretch flex-grow'} />
                <span
                    className={
                        'ml-2  font-weight-500 text-base text-' + statusColor
                    }
                >
                    {statusText}
                </span>
            </div>
            <a
                className='flex flex-row w-full text-base text-blue-600 font-weight-500'
                href={
                    'https://fastsurvey.io/' +
                    props.config.admin_name +
                    '/' +
                    props.config.survey_name
                }
                target='_blank'
                rel='noopener noreferrer'
            >
                <div className='w-6 h-6 mr-1'>{ICONS.link}</div>
                <div className='h-6'>
                    {props.config.admin_name}/{props.config.survey_name}
                </div>
            </a>
        </div>
    );
}

export default ConfigPreviewPanel;
