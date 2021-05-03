import React from 'react';
import {types} from 'types';
import icons from 'assets/icons/icons';

interface Props {
    username: string;
    config: types.SurveyConfig;
    selected: boolean;
    onClick(): void;
}
function ConfigPreviewPanel(props: Props) {
    let statusColor: string;
    let statusText: string;

    if (props.config.draft) {
        statusColor = 'border-gray-700 text-gray-700';
        statusText = 'Draft';
    } else {
        const now = Date.now() / 1000;
        if (now < props.config.start) {
            statusColor = 'border-yellow-600 text-yellow-600';
            statusText = 'Pending';
        } else if (now >= props.config.end) {
            statusColor = 'border-gray-500 text-gray-500';
            statusText = 'Finished';
        } else {
            statusColor = 'border-green-600 text-green-600';
            statusText = 'Running';
        }
    }

    return (
        <div
            onClick={props.onClick}
            className={
                'w-full py-2 px-3 my-1 rounded-l ' +
                'no-selection border-r-4 ' +
                statusColor +
                (props.selected
                    ? ' cursor-default bg-white opacity-100 '
                    : ' cursor-pointer bg-gray-100 opacity-80 ')
            }
        >
            <div className='flex flex-row items-start w-full'>
                <div className='mb-1.5 text-base leading-tight text-gray-800 font-weight-600'>
                    {props.config.title}
                </div>
                <div className={'self-stretch flex-grow'} />
                <span
                    className={'ml-2  font-weight-600 text-base ' + statusColor}
                >
                    {statusText}
                </span>
            </div>
            <div className='flex flex-row text-base text-blue-600 font-weight-500'>
                <div className='flex-shrink-0 w-6 h-6 mr-1'>{icons.link}</div>
                <div className='leading-6 break-all'>
                    {props.username}/{props.config.survey_name}
                </div>
            </div>
        </div>
    );
}

export default ConfigPreviewPanel;
