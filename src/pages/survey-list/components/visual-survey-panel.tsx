import React, {useState} from 'react';
import {types} from '/src/types';
import {TimePill} from '/src/components';
import {filter, isEmpty} from 'lodash';
import {icons} from '/src/assets';
import {Link} from 'react-router-dom';

const VITE_ENV = import.meta.env.VITE_ENV;

let baseUrl = VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    openRemoveModal(): void;
    openResetModal(): void;
    openDuplicateModal(): void;
}
function VisualConfigPanel(props: Props) {
    const {title, survey_name, draft} = props.config;
    const {username} = props.account;

    const usesAuthentication = !isEmpty(
        filter(props.config.fields, (f) => f.type === 'email' && f.verify),
    );

    const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

    return (
        <section
            className={'w-full rounded shadow centering-col bg-white '}
            data-cy={`survey-list-panel-${survey_name} ${
                draft ? 'draft' : 'published'
            }`}
        >
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
                    href={
                        props.config.draft
                            ? undefined
                            : `https://${baseUrl}/${username}/${survey_name}`
                    }
                    className={
                        'text-sm underline md:h-5 md:truncate font-weight-600 ' +
                        'text-blue-800 mt-1 break-all ' +
                        (props.config.draft
                            ? 'cursor-not-allowed opacity-70'
                            : 'hover:text-blue-500 focus:text-blue-500 px-1 -mx-1 ringable rounded-sm mt-1')
                    }
                    target='_blank'
                    data-cy='link-to-frontend'
                >
                    {baseUrl}/{username}/{survey_name}
                </a>
                <div className='mt-1 text-sm text-gray-600 md:h-5 md:truncate font-weight-500 no-selection'>
                    {props.config.fields.length} Question
                    {props.config.fields.length === 1 ? '' : 's'}
                    {usesAuthentication ? ', Email Verification' : ''}
                </div>
            </div>
            <div className='w-full space-x-px bg-gray-300 border-t border-gray-300 rounded-b flex-row-center'>
                <Link
                    to={`/editor/${survey_name}`}
                    className='z-0 flex-grow rounded group ringable focus:z-10'
                    data-cy='link-to-editor'
                >
                    <div
                        className={
                            'px-3 h-9 bg-gray-100 no-selection flex-row-center ' +
                            'rounded-bl group-focus:rounded ' +
                            'group-hover:bg-blue-50 group-focus:bg-blue-50 ' +
                            'text-center text-sm text-gray-700 font-weight-600 ' +
                            'group-hover:text-blue-900 group-focus:text-blue-900 '
                        }
                    >
                        Editor
                    </div>
                </Link>
                <Link
                    to={`/results/${survey_name}`}
                    className='z-0 flex-grow rounded ringable group focus:z-10'
                    data-cy='link-to-results'
                >
                    <div
                        className={
                            'px-3 h-9 bg-gray-100 no-selection flex-row-center ' +
                            'group-focus:rounded ' +
                            'group-hover:bg-blue-50 group-focus:bg-blue-50 ' +
                            'text-center text-sm text-gray-700 font-weight-600 ' +
                            'group-hover:text-blue-900 group-focus:text-blue-900 '
                        }
                    >
                        Results
                    </div>
                </Link>
                <div className={'relative h-9'}>
                    <button
                        className={
                            'p-2 h-9 rounded-br focus:rounded ringable fill-current ' +
                            'bg-gray-100 hover:bg-blue-50 focus:bg-blue-50 ' +
                            'text-gray-700 hover:text-blue-900 focus:text-blue-900 '
                        }
                        onClick={() => setDropDownIsVisible(!dropDownIsVisible)}
                        data-cy='button-toggle-actions'
                    >
                        {dropDownIsVisible ? icons.close : icons.chevronSelection}
                    </button>
                    {dropDownIsVisible && (
                        <div
                            className={
                                'absolute right-1 -top-1 -translate-y-full ' +
                                'rounded shadow flex-col-center overflow-hidden ' +
                                'bg-gray-900 text-gray-300 text-sm '
                            }
                            data-cy='actions-dropdown'
                        >
                            {[
                                'duplicate survey',
                                'remove survey',
                                'reset submissions',
                            ].map((action: string) => (
                                <button
                                    key={action}
                                    className={
                                        'w-full px-6 h-8 font-weight-600 whitespace-nowrap ' +
                                        'hover:bg-gray-600 hover:text-white ' +
                                        'focus:bg-gray-600 focus:text-white focus:outline-none '
                                    }
                                    onClick={() => {
                                        switch (action) {
                                            case 'duplicate survey':
                                                props.openDuplicateModal();
                                                break;
                                            case 'remove survey':
                                                props.openRemoveModal();
                                                break;
                                            case 'reset submissions':
                                                props.openResetModal();
                                                break;
                                        }
                                    }}
                                    data-cy={`button-${action}`}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default VisualConfigPanel;
