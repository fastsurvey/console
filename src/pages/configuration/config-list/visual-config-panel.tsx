import React from 'react';
import {configTypes} from 'utilities';
import icons from 'assets/icons/icons';

interface ConfigPreviewPanelProps {
    config: configTypes.SurveyConfig;
    selected: boolean;
    onClick(): void;
}

function ConfigPreviewPanel(props: ConfigPreviewPanelProps) {
    let statusColor: string;
    let statusText: string;

    if (props.config.draft) {
        statusColor = 'gray-500';
        statusText = 'Draft';
    } else {
        const now = Date.now() / 1000;
        if (now < props.config.start) {
            statusColor = 'yellow-600';
            statusText = 'Pending';
        } else if (now >= props.config.end) {
            statusColor = 'gray-700';
            statusText = 'Finished';
        } else {
            statusColor = 'green-500';
            statusText = 'Running';
        }
    }

    return (
        <div
            onClick={props.onClick}
            className={
                'w-full p-2 my-1 rounded-l shadow ' +
                'no-selection border-r-4 border-' +
                statusColor +
                (props.selected
                    ? ' cursor-pointer bg-gray-200 '
                    : ' cursor-default bg-white ')
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
            <div className='flex flex-row text-base text-blue-600 font-weight-500'>
                <div className='w-6 h-6 mr-1'>{icons.link}</div>
                <div className='h-6'>
                    {props.config.admin_name}/{props.config.survey_name}
                </div>
            </div>
        </div>
    );
}

export default ConfigPreviewPanel;
