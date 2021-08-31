import React, {useState} from 'react';
import {sortBy} from 'lodash';
import {Link} from 'react-router-dom';
import {types} from '@types';
import {Button, SearchBar} from '@components';
import {icons} from '@assets';
import VisualConfigPanel from './visual-config-panel';

function VisualConfigList(props: {
    configs: types.SurveyConfig[];
    addSurvey(): void;
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
                            to={`/configuration/${config.survey_name}`}
                            key={config.local_id}
                            className='rounded ringable group'
                        >
                            <VisualConfigPanel
                                config={config}
                                account={props.account}
                            />
                        </Link>
                    ))}
                    <button
                        type='button'
                        className={
                            'relative w-full h-full px-2 py-6 flex-row-center ' +
                            'border-2 border-gray-400 border-dashed rounded ' +
                            'text-opacity-60 border-gray-300 ringable ' +
                            'hover:text-opacity-100 hover:border-gray-400 ' +
                            'focus:text-opacity-100 focus:hover:border-gray-400 ' +
                            'text-base text-blue-900 font-weight-600'
                        }
                        onClick={props.addSurvey}
                    >
                        New Survey
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VisualConfigList;
