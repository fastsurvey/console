import React, {useState} from 'react';
import {sortBy} from 'lodash';
import {Link} from 'react-router-dom';
import {types} from 'types';
import VisualResultsPanel from './visual-results-panel';
import {SearchBar} from 'components';

function VisualConfigList(props: {
    configs: types.SurveyConfig[];
    account: types.Account;
}) {
    const [value, setValue] = useState('');
    return (
        <div
            className={
                'py-32 min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-4xl centering-col'>
                <div className='w-full mt-1 mb-6 centering-row gap-x-3'>
                    <SearchBar value={value} setValue={setValue} />
                </div>

                <div className='grid w-full grid-cols-2 gap-3'>
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
                        <Link
                            to={`/results/${config.survey_name}`}
                            key={config.local_id}
                            className='rounded ringable group'
                        >
                            <VisualResultsPanel
                                config={config}
                                account={props.account}
                            />
                        </Link>
                    ))}
                </div>

                {props.configs.length === 0 && (
                    <p className='w-full my-4 text-center text-gray-600 font-weight-500'>
                        No surveys yet
                    </p>
                )}
            </div>
        </div>
    );
}

export default VisualConfigList;
