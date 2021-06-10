import React from 'react';
import {types} from 'types';
import icons from 'assets/icons/icons';
import {IconButton, TimePill} from 'components';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import IconButtonGroup from 'components/buttons/icon-button-group';

function EditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(modifyDraft?: boolean): void;
    revertState(): void;
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
                <IconButtonGroup
                    buttons={
                        draft
                            ? [
                                  {
                                      icon: icons.closeCirlce,
                                      text: 'undo',
                                      onClick: props.revertState,
                                  },
                                  {
                                      icon: icons.checkCircle,
                                      text: 'save',
                                      onClick: props.saveState,
                                  },
                              ]
                            : []
                    }
                />
                <div className='w-4' />
                <IconButton
                    icon={draft ? icons.uploadCloud : icons.addBox}
                    text={draft ? 'publish' : 'edit'}
                    onClick={() => {
                        props.saveState(true);
                    }}
                />
            </div>
            {draft && (
                <div className='px-1.5 py-0.5 transform -translate-x-1.5 cursor-not-allowed'>
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

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader);
