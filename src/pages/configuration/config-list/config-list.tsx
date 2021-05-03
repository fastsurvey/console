import React from 'react';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import {reduxUtils, backend, templateUtils} from 'utilities';
import icons from 'assets/icons/icons';

import {Button, InlineButton} from 'components';
import ConfigPreviewPanel from './visual-config-panel';
import VisualConfigList from './visual-config-list';
import AddSurveyPopup from 'pages/configuration/config-list/add-survey-popup';
import {types} from 'types';
import {sortBy} from 'lodash';

interface Props {
    account: types.Account;
    authToken: types.AuthToken;

    configs: types.SurveyConfig[];
    configIsDiffering: boolean;
    openMessage(message: types.Message): void;
    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    addConfig(config: types.SurveyConfig): void;
}
function ConfigList(props: Props) {
    let location = useLocation();
    let history = useHistory();

    function handleClick(survey_name: string) {
        const configPath = `/configuration/${survey_name}`;
        if (location.pathname !== configPath) {
            if (!props.configIsDiffering) {
                history.push(configPath);
            } else {
                props.openMessage({
                    text: 'Please save or undo your changes first!',
                    type: 'warning',
                });
            }
        }
    }

    function addSurvey(surveyName: string) {
        const newConfig = templateUtils.survey(
            surveyName,
            props.configs.length,
        );

        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/configuration/${surveyName}`);
        };
        const error = (code: 400 | 401 | 422 | 500) => {};

        backend.createSurvey(
            props.account,
            props.authToken,
            newConfig,
            success,
            error,
        );
    }

    return (
        <VisualConfigList>
            <div
                className={
                    'box-content relative w-full h-10 mb-3 ' +
                    'bg-white text-gray-900 hover:text-rose-600 ' +
                    'text-center leading-10 font-weight-600 ' +
                    'shadow cursor-pointer overflow-visible '
                }
                onClick={() =>
                    props.openModal(
                        'Add a new survey',
                        <AddSurveyPopup addSurvey={addSurvey} />,
                    )
                }
            >
                <InlineButton icon={icons.add} text='New Survey' />
            </div>
            {props.configs.length === 0 && (
                <p className='w-full my-4 text-center text-gray-600 font-weight-500'>
                    No surveys yet
                </p>
            )}
            {sortBy(props.configs, ['survey_name']).map((config, index) => (
                <ConfigPreviewPanel
                    key={config.local_id}
                    selected={
                        location.pathname ===
                        `/configuration/${config.survey_name}`
                    }
                    onClick={() => handleClick(config.survey_name)}
                    config={config}
                    username={props.account.username}
                />
            ))}
        </VisualConfigList>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
    authToken: state.authToken,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
    addConfig: reduxUtils.dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
