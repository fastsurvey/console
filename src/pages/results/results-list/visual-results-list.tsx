import React, {useState} from 'react';
import {sortBy} from 'lodash';
import {Link} from 'react-router-dom';
import {types} from '@types';
import {SearchBar} from '@components';
import VisualResultsPanel from './visual-results-panel';

function VisualConfigList(props: {
    configs: types.SurveyConfig[];
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    const [value, setValue] = useState('');
    return (
        <div
            className={
                'px-4 lg:px-0 py-20 md:py-32 ' +
                'min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-4xl flex-col-center'>
                <h1 className='w-full mb-4 text-2xl text-blue-900 font-weight-700'>
                    Analyze Survey Results
                </h1>
                <div className='w-full mb-6'>
                    <SearchBar value={value} setValue={setValue} />
                </div>

                <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2'>
                    {sortBy(
                        props.configs.filter(
                            (c) =>
                                c.title
                                    .toLowerCase()
                                    .includes(value.toLowerCase()) ||
                                c.survey_name
                                    .toLowerCase()
                                    .includes(value.toLowerCase()),
                        ),
                        ['survey_name'],
                    ).map((config) => (
                        <VisualResultsPanel
                            config={config}
                            account={props.account}
                            accessToken={props.accessToken}
                        />
                    ))}
                </div>

                {props.configs.length === 0 && (
                    <p className='w-full my-4 text-center text-gray-600 font-weight-500'>
                        No survey results yet
                    </p>
                )}
            </div>
        </div>
    );
}

export default VisualConfigList;
