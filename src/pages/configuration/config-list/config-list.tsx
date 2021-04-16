import React from 'react';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import {stateTypes, configTypes, dispatchers} from 'utilities';
import icons from 'assets/icons/icons';

import {ButtonLink} from 'components';
import ConfigPreviewPanel from './visual-config-panel';
import VisualConfigList from './visual-config-list';
import AddSurveyPopup from 'pages/configuration/config-list/add-survey-popup';
import surveyTemplate from '../../../utilities/template-helpers/add-survey';
import postConfig from '../../../utilities/ajax-helpers/post-config';

interface Props {
    oauth2_token: stateTypes.OAuth2Token | undefined;
    account: stateTypes.Account | undefined;

    configs: undefined | configTypes.SurveyConfig[];
    configIsDiffering: boolean;
    openMessage(message: stateTypes.Message): void;
    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    addConfig(config: configTypes.SurveyConfig): void;
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
        if (props.configs !== undefined && props.oauth2_token) {
            const newConfig = surveyTemplate(
                'fastsurvey',
                surveyName,
                props.configs,
            );
            try {
                postConfig(props.oauth2_token, newConfig);
                props.addConfig(
                    surveyTemplate('fastsurvey', surveyName, props.configs),
                );
            } catch {}
        }

        props.closeModal();
        history.push(`/configuration/${surveyName}`);
    }

    if (!props.configs) {
        return (
            <div className='w-64 h-full center-content'>
                <p>Loading surveys</p>
            </div>
        );
    }

    return (
        <VisualConfigList>
            {props.configs.length === 0 && (
                <p className='w-full my-4 text-center text-gray-100 font-weight-600'>
                    No surveys yet
                </p>
            )}
            {props.configs.map((config, index) => (
                <ConfigPreviewPanel
                    key={config.local_id}
                    selected={
                        location.pathname ===
                        `/configuration/${config.survey_name}`
                    }
                    onClick={() => handleClick(config.survey_name)}
                    config={config}
                />
            ))}
            <ButtonLink
                icon={icons.add}
                onClick={() =>
                    props.openModal(
                        'Add a new survey',
                        <AddSurveyPopup addSurvey={addSurvey} />,
                    )
                }
                className='w-full mt-1'
            >
                New survey
            </ButtonLink>
        </VisualConfigList>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
    oauth2_token: state.oauth2_token,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatchers.openMessage(dispatch),
    openModal: dispatchers.openModal(dispatch),
    closeModal: dispatchers.closeModal(dispatch),
    addConfig: dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
