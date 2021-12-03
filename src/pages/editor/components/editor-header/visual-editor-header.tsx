import React from 'react';
import {Link} from 'react-router-dom';
import {types} from '/src/types';
import icons from '/src/assets/icons/icons';
import {Button, ButtonGroup, TimePill} from '/src/components';

const frontendUrl =
    import.meta.env.VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';

function VisualEditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(configChanges?: object): void;
    revertState(): void;
    openMessage(messageId: types.MessageId): void;

    saveButtons: {
        icon: React.ReactNode;
        text: string;
        onClick(): void;
        'data-cy': string;
    }[];
    timeButton: {
        icon: React.ReactNode;
        text: string;
        onClick(): void;
        'data-cy': string;
    };
    publishButton: {
        icon: React.ReactNode;
        text: string;
        onClick(): void;
        'data-cy': string;
    };
}) {
    const {title, survey_name, draft} = props.localConfig;
    const {username} = props.account;

    const linkContent = (
        <div className='text-sm text-blue-700 underline md:truncate font-weight-600'>
            {frontendUrl}/{username}/{survey_name}
        </div>
    );

    return (
        <div className={'w-full pl-2 flex-col-left mb-1'} data-cy='editor-header'>
            <div className='relative block w-full mb-8 md:mb-2 flex-row-right md:hidden'>
                {props.saveButtons.length > 0 && (
                    <>
                        <ButtonGroup buttons={props.saveButtons} hideIconsOnMobile />
                        <div className='flex-shrink-0 w-2 md:w-4' />
                    </>
                )}
                {props.localConfig.draft && (
                    <Button
                        {...props.publishButton}
                        disabled={props.configIsDiffering}
                    />
                )}
                {!props.localConfig.draft && (
                    <Button {...props.timeButton} disabled={props.configIsDiffering} />
                )}
            </div>
            <div className={'relative w-full flex-row-top'}>
                {props.configIsDiffering && (
                    <button
                        className={
                            'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                            'absolute -left-14 top-50% transform -translate-y-50% '
                        }
                        onClick={() => props.openMessage('warning-unsaved')}
                        data-cy='button-back isinactive'
                    >
                        {icons.chevronLeftCircle}
                    </button>
                )}
                {!props.configIsDiffering && (
                    <Link
                        to='/surveys'
                        className={
                            'w-10 h-10 m-1 p-2 ringable rounded icon-gray ' +
                            'absolute -left-14 top-50% transform -translate-y-50% '
                        }
                        data-cy='button-back isactive'
                    >
                        {icons.chevronLeftCircle}
                    </Link>
                )}
                <div
                    className={
                        'pr-4 text-2xl md:text-xl ' +
                        'text-gray-800 font-weight-700 truncate'
                    }
                    data-cy='title'
                >
                    {title}
                </div>
                <div className='flex-max' />
                <div
                    className={
                        'relative hidden md:flex flex-row items-start justify-start'
                    }
                >
                    {props.saveButtons.length > 0 && (
                        <>
                            <ButtonGroup
                                buttons={props.saveButtons}
                                hideIconsOnMobile
                            />
                            <div className='flex-shrink-0 w-2 md:w-4' />
                        </>
                    )}
                    {props.localConfig.draft && (
                        <Button
                            {...props.publishButton}
                            disabled={props.configIsDiffering}
                        />
                    )}
                    {!props.localConfig.draft && (
                        <Button
                            {...props.timeButton}
                            disabled={props.configIsDiffering}
                        />
                    )}
                </div>
            </div>
            {(draft || props.configIsDiffering) && (
                <div
                    className={
                        'px-1.5 py-0.5 transform -translate-x-1.5 ' +
                        'cursor-not-allowed opacity-70'
                    }
                    data-cy='link-to-frontend isinactive'
                >
                    {linkContent}
                </div>
            )}
            {!(draft || props.configIsDiffering) && (
                <a
                    href={`https://${frontendUrl}/${username}/${survey_name}`}
                    className='px-1.5 py-0.5 transform -translate-x-1.5 rounded ringable'
                    target='_blank'
                    rel='noopener noreferrer'
                    data-cy='link-to-frontend isactive'
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
