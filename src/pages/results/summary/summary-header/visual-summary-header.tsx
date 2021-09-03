import React from 'react';
import {Link} from 'react-router-dom';
import {types} from '@types';
import icons from '@assets/icons/icons';
import {Button, TimePill} from '@components';

function VisualSummaryHeader(props: {
    account: types.Account;
    config: types.SurveyConfig;
    results: types.SurveyResults | undefined;
    refreshResults(): void;
}) {
    const {title, survey_name} = props.config;
    const {username} = props.account;

    const linkContent = (
        <div className='text-sm text-gray-600 truncate font-weight-500'>
            dev.fastsurvey.io/{username}/{survey_name}
        </div>
    );

    return (
        <div className={'w-full flex-col-left mb-1'}>
            <div className='relative w-full centering-row '>
                <Link
                    to='/results'
                    className={
                        'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                        'absolute -left-14 top-50% transform -translate-y-50% '
                    }
                >
                    {icons.chevronLeftCircle}
                </Link>

                <div
                    className={
                        'pr-4 text-xl text-gray-800 font-weight-600 truncate'
                    }
                >
                    {title}{' '}
                    {props.results === undefined
                        ? '(... submissions)'
                        : `(${props.results.count} submissions)`}
                </div>
                <div className='flex-max' />
                <Button
                    icon={icons.chevronDown}
                    text={'refresh'}
                    onClick={props.refreshResults}
                />
            </div>
            <a
                href={`https://dev.fastsurvey.de/${username}/${survey_name}`}
                className='px-1.5 py-0.5 transform -translate-x-1.5 rounded ringable'
                target='_blank'
                rel='noopener noreferrer'
            >
                {linkContent}
            </a>
            <div className='flex-shrink-0 mt-2'>
                <TimePill config={props.config} flat />
            </div>
        </div>
    );
}

export default VisualSummaryHeader;
