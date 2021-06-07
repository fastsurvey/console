import {sortBy} from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import {types} from 'types';
import VisualConfigPanel from './visual-config-panel';
import {IconButton} from 'components';

function VisualConfigList(props: {
    configs: types.SurveyConfig[];
    addSurvey(surveyName: string): void;
    account: types.Account;
}) {
    return (
        <div
            className={
                'p-2 min-h-screen w-full z-0 centering-col ' +
                'overflow-y-scroll overflow-x-hidden'
            }
        >
            {props.configs.length === 0 && (
                <p className='w-full my-4 text-center text-gray-600 font-weight-500'>
                    No surveys yet
                </p>
            )}
            {sortBy(props.configs, ['survey_name']).map((config) => (
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
            <div className='w-full mt-1 centering-row'>
                <IconButton />
            </div>
        </div>
    );
}

export default VisualConfigList;
