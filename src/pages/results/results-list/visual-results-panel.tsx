import React from 'react';
import {types} from '@types';
import {TimePill} from '@components';
import {isEmpty, filter} from 'lodash';
import {Link} from 'react-router-dom';

const VITE_ENV = import.meta.env.VITE_ENV;

let baseUrl =
    VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    accessToken: types.AccessToken;
}
function VisualConfigPanel(props: Props) {
    const {title, survey_name} = props.config;
    const {username} = props.account;

    const usesAuthentication = !isEmpty(
        filter(props.config.fields, (f) => f.type === 'email' && f.verify),
    );

    return (
        <div className={'w-full rounded shadow centering-col bg-white '}>
            <div className={'w-full p-3 bg-white rounded-t flex-col-left'}>
                <div
                    className={
                        'w-full flex md:h-6 ' +
                        'flex-col-reverse items-center justify-center ' +
                        'sm:flex-row sm:items-center sm:justify-center '
                    }
                >
                    <div
                        className={
                            'pr-4 text-base text-gray-800 font-weight-600 ' +
                            'mb-1 md:mb-0 md:truncate leading-tight ' +
                            'w-full sm:w-auto sm:flex-grow'
                        }
                    >
                        {title}
                    </div>
                    <div className='flex-shrink-0 w-full pb-1.5 sm:w-auto flex-row-right sm:pb-0'>
                        <TimePill config={props.config} flat />
                    </div>
                </div>
                <a
                    href={`https://${baseUrl}/${username}/${survey_name}`}
                    className={
                        'text-sm underline md:h-5 md:truncate font-weight-600 ' +
                        'text-blue-800 hover:text-blue-500 break-all ' +
                        'px-1 -mx-1 ringable rounded-sm mt-1 focus:text-blue-500'
                    }
                    target='_blank'
                >
                    {baseUrl}/{username}/{survey_name}
                </a>
                <div className='mt-1 text-sm text-gray-600 md:h-5 md:truncate font-weight-500 no-selection'>
                    {props.config.fields.length} Question
                    {props.config.fields.length === 1 ? '' : 's'}
                    {usesAuthentication ? ', Email Verification' : ''}
                </div>
            </div>
            <Link
                to={`/results/${survey_name}`}
                className='flex-grow w-full rounded ringable group'
            >
                <div
                    className={
                        'px-3 h-9 bg-gray-100 no-selection flex-row-center ' +
                        'rounded-b group-focus:rounded w-full ' +
                        'group-hover:bg-gray-200 group-focus:bg-gray-200 ' +
                        'text-center text-sm text-gray-700 font-weight-600 ' +
                        'group-hover:text-black group-focus:text-black '
                    }
                >
                    view results
                </div>
            </Link>
        </div>
    );
}

export default VisualConfigPanel;
