import React, {useState, useEffect} from 'react';
import {types} from '@types';
import {TimePill} from '@components';
import {backend} from '@utilities';
import {isEmpty, filter} from 'lodash';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    authToken: types.AuthToken;
}
function VisualConfigPanel(props: Props) {
    const {title, survey_name} = props.config;
    const {username} = props.account;

    const [results, setResults] = useState<types.SurveyResults>({
        count: 0,
        data: [],
    });
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        backend.fetchResults(
            props.account,
            props.authToken,
            props.config.survey_name,
            (r) => {
                setResults(r);
                setFetching(false);
            },
            console.log,
        );
        // eslint-disable-next-line
    }, []);

    const usesAuthentication = !isEmpty(
        filter(props.config.fields, (f) => f.type === 'email' && f.verify),
    );

    return (
        <div
            className={
                'w-full rounded shadow centering-col ' +
                'cursor-pointer bg-white '
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
                <div className='mt-3 text-sm text-gray-600 truncate font-weight-500 no-selection'>
                    {fetching && '...'}
                    {!fetching && (
                        <>
                            {props.config.fields.length} Question
                            {props.config.fields.length === 1 ? '' : 's'},
                            {results.count} Submission
                            {results.count === 1 ? '' : 's'}
                            {usesAuthentication ? ', Email Verification' : ''}
                        </>
                    )}
                </div>
            </div>
            <div
                className={
                    'w-full px-3 py-2 bg-gray-100 rounded-b no-selection ' +
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
