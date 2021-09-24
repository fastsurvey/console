import React from 'react';
import {Link} from 'react-router-dom';
import {types} from '@types';
import icons from '@assets/icons/icons';
import {Button, ButtonGroup, TimePill} from '@components';

const frontendURL = 'fastsurvey.de';

function VisualEditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(configChanges?: object): void;
    revertState(): void;
    openMessage(messageId: types.MessageId): void;

    buttons: {
        icon: React.ReactNode;
        text: string;
        onClick(): void;
        disabled?: boolean;
    }[];
}) {
    const {title, survey_name, draft} = props.localConfig;
    const {username} = props.account;

    const linkContent = (
        <div className='text-sm text-blue-700 underline md:truncate font-weight-600'>
            {frontendURL}/{username}/{survey_name}
        </div>
    );

    return (
        <div className={'w-full pl-2 flex-col-left mb-1'}>
            <div className='relative block w-full my-2 flex-row-right md:hidden'>
                <ButtonGroup buttons={props.buttons} />
                <div className='flex-shrink-0 w-2 md:w-4' />
                <Button
                    icon={draft ? icons.uploadCloud : icons.edit}
                    text={draft ? 'publish' : 'edit'}
                    onClick={() => {
                        props.saveState({
                            draft: !draft,
                        });
                    }}
                />
            </div>
            <div className={'relative w-full flex-row-top'}>
                {!props.configIsDiffering && (
                    <Link
                        to='/configurations'
                        className={
                            'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                            'absolute -left-14 top-50% transform -translate-y-50% '
                        }
                    >
                        {icons.chevronLeftCircle}
                    </Link>
                )}
                {props.configIsDiffering && (
                    <button
                        className={
                            'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                            'absolute -left-14 top-50% transform -translate-y-50% '
                        }
                        onClick={() => props.openMessage('warning-unsaved')}
                    >
                        {icons.chevronLeftCircle}
                    </button>
                )}

                <div
                    className={
                        'pr-4 text-xl text-gray-800 font-weight-600 truncate'
                    }
                >
                    {title}
                </div>
                <div className='flex-max' />
                <div
                    className={
                        'relative hidden md:flex flex-row items-start justify-start'
                    }
                >
                    <ButtonGroup buttons={props.buttons} />
                    <div className='flex-shrink-0 w-2' />
                    <Button
                        icon={draft ? icons.uploadCloud : icons.edit}
                        text={draft ? 'publish' : 'edit'}
                        onClick={() => {
                            props.saveState({
                                draft: !draft,
                            });
                        }}
                    />
                </div>
            </div>
            {draft && (
                <div className='px-1.5 py-0.5 transform -translate-x-1.5 cursor-not-allowed opacity-70'>
                    {linkContent}
                </div>
            )}
            {!draft && (
                <a
                    href={`https://${frontendURL}/${username}/${survey_name}`}
                    className='px-1.5 py-0.5 transform -translate-x-1.5 rounded ringable'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {linkContent}
                </a>
            )}
            <div className='flex-shrink-0 mt-2'>
                <TimePill config={props.localConfig} flat />
            </div>
        </div>
    );
}

export default VisualEditorHeader;
