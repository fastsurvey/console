import React from 'react';
import {types} from 'types';
import icons from 'assets/icons/icons';

interface Props {
    config: types.SurveyConfig;
    selected: boolean;
    onClick(): void;
}
function ConfigPreviewPanel(props: Props) {
    let statusColor: string;
    let statusText: string;

    if (props.config.draft) {
        statusColor = 'gray-800';
        statusText = 'Draft';
    } else {
        const now = Date.now() / 1000;
        if (now < props.config.start) {
            statusColor = 'yellow-500';
            statusText = 'Pending';
        } else if (now >= props.config.end) {
            statusColor = 'gray-500';
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
                'w-full py-2 px-3 my-1 rounded-l shadow ' +
                'no-selection border-r-4 border-' +
                statusColor +
                (props.selected
                    ? ' cursor-default bg-white'
                    : ' cursor-pointer bg-gray-300')
            }
        >
            <div className='flex flex-row items-start w-full'>
                <div className='text-lg leading-8 text-gray-800 font-weight-600 '>
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
                <div className='flex-shrink-0 w-6 h-6 mr-1'>{icons.link}</div>
                <div className='leading-6 break-all'>
                    {props.config.admin_name}/{props.config.survey_name}
                </div>
            </div>
        </div>
    );
}

export default ConfigPreviewPanel;
