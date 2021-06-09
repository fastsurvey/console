import React from 'react';
import {types} from 'types';
import {TimePill} from 'components';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
}
function VisualConfigPanel(props: Props) {
    const {title, survey_name, limit, authentication} = props.config;
    const {username} = props.account;

    return (
        <div
            className={
                'w-full rounded shadow centering-col ' +
                'no-selection cursor-pointer bg-white '
            }
        >
            <div className={'w-full p-3 bg-white rounded-t flex-col-left'}>
                <div className='w-full mb-0.5 flex-row-top'>
                    <div
                        className={
                            'pr-4 text-lg text-gray-800 font-weight-600 ' +
                            'truncate'
                        }
                    >
                        {title}
                    </div>
                    <div className='flex-max' />
                    <div className='flex-shrink-0'>
                        <TimePill config={props.config} flat />
                    </div>
                </div>
                <div className='text-sm text-gray-600 truncate font-weight-500'>
                    /{username}/{survey_name}
                </div>
                <div className='mt-3 text-sm text-gray-600 truncate font-weight-500'>
                    {authentication === 'email' ? 'Email Verification, ' : ''}
                    Max. {limit} submissions
                </div>
            </div>
            <div
                className={
                    'w-full px-3 py-2 bg-gray-100 rounded-b ' +
                    'group-hover:bg-gray-200 group-focus:bg-gray-200 ' +
                    'text-center text-blue-900 font-weight-600'
                }
            >
                Edit Survey
            </div>
        </div>
    );
}

export default VisualConfigPanel;
