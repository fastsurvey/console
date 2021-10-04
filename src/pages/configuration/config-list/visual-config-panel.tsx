import React, {useState} from 'react';
import {types} from '@types';
import {TimePill} from '@components';
import {filter, isEmpty} from 'lodash';
import {icons} from '@assets';
import {Link} from 'react-router-dom';

const VITE_ENV = import.meta.env.VITE_ENV;

let baseUrl =
    VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    openRemoveModal(): void;
    openDuplicateModal(): void;
}
function VisualConfigPanel(props: Props) {
    const {title, survey_name} = props.config;
    const {username} = props.account;

    const usesAuthentication = !isEmpty(
        filter(props.config.fields, (f) => f.type === 'email' && f.verify),
    );

    const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

    return (
        <div
            className={
                'w-full rounded shadow centering-col ' +
                'cursor-pointer bg-white '
            }
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
                        'text-blue-800 mt-1 ' +
                        (props.config.draft
                            ? 'cursor-not-allowed opacity-70'
                            : 'hover:text-blue-500 focus:text-blue-500 px-1 -mx-1 ringable rounded-sm mt-1')
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
            <div className='w-full space-x-1 bg-gray-100 rounded-b flex-row-center'>
                <Link
                    to={`/configuration/${survey_name}`}
                    className='flex-grow rounded ringable group'
                >
                    <div
                        className={
                            'px-3 h-9 bg-gray-100 no-selection flex-row-center ' +
                            'rounded-bl group-focus:rounded ' +
                            'group-hover:bg-gray-200 group-focus:bg-gray-200 ' +
                            'text-center text-sm text-gray-700 font-weight-600 ' +
                            'group-hover:text-black group-focus:text-black '
                        }
                    >
                        edit
                    </div>
                </Link>
                <div className={'relative h-9'}>
                    <button
                        className={
                            'p-2 h-9 rounded-br focus:rounded ringable fill-current ' +
                            'bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 ' +
                            'text-gray-700 hover:text-black focus:text-black '
                        }
                        onClick={() => setDropDownIsVisible(!dropDownIsVisible)}
                    >
                        {dropDownIsVisible
                            ? icons.close
                            : icons.chevronSelection}
                    </button>
                    {dropDownIsVisible && (
                        <div
                            className={
                                'absolute right-1 -top-1 -translate-y-full ' +
                                'rounded shadow flex-col-center overflow-hidden ' +
                                'bg-gray-900 text-gray-300 text-sm '
                            }
                        >
                            {['duplicate', 'remove'].map((format: any) => (
                                <button
                                    key={format}
                                    className={
                                        'w-full px-6 h-8 font-weight-600 ' +
                                        'hover:bg-gray-600 hover:text-white ' +
                                        'focus:bg-gray-600 focus:text-white focus:outline-none '
                                    }
                                    onClick={
                                        format === 'duplicate'
                                            ? props.openDuplicateModal
                                            : props.openRemoveModal
                                    }
                                >
                                    {format}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisualConfigPanel;
