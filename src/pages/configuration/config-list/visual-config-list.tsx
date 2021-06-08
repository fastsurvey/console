import React, {useState} from 'react';
import {sortBy} from 'lodash';
import {Link} from 'react-router-dom';
import {types} from 'types';
import VisualConfigPanel from './visual-config-panel';
import {IconButton, SearchBar} from 'components';
import {icons} from 'assets';

function VisualConfigList(props: {
    configs: types.SurveyConfig[];
    addSurvey(): void;
    account: types.Account;
}) {
    const [value, setValue] = useState('');
    return (
        <div
            className={
                'p-2 min-h-screen w-full z-0 centering-col ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-2xl centering-col'>
                <div className='w-full mt-1 centering-row gap-x-4'>
                    <SearchBar value={value} setValue={setValue} />
                    <IconButton
                        icon={icons.addSquare}
                        text='Add Survey'
                        onClick={props.addSurvey}
                    />
                </div>

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
                    >
                        <VisualConfigPanel
                            config={config}
                            account={props.account}
                        />
                    </Link>
                ))}

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
