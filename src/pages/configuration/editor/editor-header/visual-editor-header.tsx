import React from 'react';
import {types} from 'types';
import icons from 'assets/icons/icons';
import {IconButton, TimePill} from 'components';
import {Link} from 'react-router-dom';
import IconButtonGroup from 'components/buttons/icon-button-group';

function VisualEditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(configChanges?: object): void;
    revertState(): void;

    buttons: {
        icon: React.ReactNode;
        text: string;
        onClick(): void;
    }[];
}) {
    const {title, survey_name, draft} = props.localConfig;
    const {username} = props.account;

    const linkContent = (
        <div className='text-sm text-gray-600 truncate font-weight-500'>
            dev.fastsurvey.io/{username}/{survey_name}
        </div>
    );

    return (
        <div className={'w-full flex-col-left mb-1'}>
            <div className='relative w-full centering-row '>
                <Link
                    to='/configurations'
                    className={
                        'w-10 h-10 m-1 p-2 ' +
                        'absolute -left-14 top-50% transform -translate-y-50% ' +
                        'ringable rounded icon-gray'
                    }
                >
                    {icons.chevronLeftCircle}
                </Link>

                <div
                    className={
                        'pr-4 text-xl text-gray-800 font-weight-600 truncate'
                    }
                >
                    {title}
                </div>
                <div className='flex-max' />
                <IconButtonGroup buttons={props.buttons} />
                <div className='w-4' />
                <IconButton
                    icon={draft ? icons.uploadCloud : icons.edit}
                    text={draft ? 'publish' : 'edit'}
                    onClick={() => {
                        props.saveState({
                            draft: !draft,
                        });
                    }}
                />
            </div>
            {draft && (
                <div className='px-1.5 py-0.5 transform -translate-x-1.5 cursor-not-allowed opacity-70'>
                    {linkContent}
                </div>
            )}
            {!draft && (
                <a
                    href={`https://dev.fastsurvey.io/${username}/${survey_name}`}
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
