import RemoveSurveyPopup from './remove-survey-popup';
import DuplicateSurveyPopup from './duplicate-survey-popup';
import React from 'react';
import {connect} from 'react-redux';
import {validators, reduxUtils, backend} from 'utilities';
import VisualSettings from './visual-settings';
import {useHistory} from 'react-router-dom';
import {types} from 'types';

interface Props {
    account: types.Account;
    authToken: types.AuthToken;
    centralConfigName: string;
    openMessage(m: types.Message): void;
    configIsDiffering: boolean;

    configs: types.SurveyConfig[] | undefined;
    config: types.SurveyConfig;
    setLocalConfig(config: object): void;
    updateValidator(newState: boolean): void;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    removeConfig(surveyName: string): void;
    addConfig(newConfig: types.SurveyConfig): void;
}
function Settings(props: Props) {
    let history = useHistory();

    const titleIsValid = validators.title;
    const surveyNameIsValid = validators.surveyName(
        props.configs,
        props.config,
    );
    const descriptionIsValid = validators.description;
    const submissionLimitIsValid = validators.submissionLimit;

    function updateConfig(
        newConfig: types.SurveyConfig,
        skipValidation?: boolean,
    ) {
        if (!skipValidation) {
            props.updateValidator(
                titleIsValid(newConfig.title) &&
                    surveyNameIsValid(newConfig.survey_name) &&
                    descriptionIsValid(newConfig.description) &&
                    submissionLimitIsValid(newConfig.limit),
            );
        }
        props.setLocalConfig(newConfig);
    }

    function openRemoveModal() {
        props.openModal(
            'Remove this survey permanently?',
            <RemoveSurveyPopup
                removeSurvey={removeSurvey}
                closeModal={props.closeModal}
            />,
        );
    }

    function removeSurvey() {
        function success() {
            props.removeConfig(props.config.survey_name);
            props.closeModal();
            history.push('/configurations');
        }

        function error() {
            props.closeModal();
            props.openMessage({
                text: 'Backend error, please reload the page',
                type: 'error',
            });
        }

        backend.deleteSurvey(
            props.account,
            props.authToken,
            props.centralConfigName,
            success,
            error,
        );
    }

    function openDuplicateModal() {
        if (!props.configIsDiffering) {
            props.openModal(
                'Duplicate this survey',
                <DuplicateSurveyPopup
                    originalSurveyName={props.config.survey_name}
                    duplicateSurvey={duplicateSurvey}
                />,
            );
        } else {
            props.openMessage({
                text: 'Please save or undo your changes first!',
                type: 'warning',
            });
        }
    }
    function duplicateSurvey(newSurveyName: string) {
        const newConfig = {
            ...props.config,
            survey_name: newSurveyName,
        };
        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/configuration/${newSurveyName}`);
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
        <VisualSettings
            updateConfig={updateConfig}
            surveyNameIsValid={surveyNameIsValid}
            config={props.config}
            updateValidator={props.updateValidator}
            commonProps={{
                updateConfig,
                disabled: !props.config.draft,
                config: props.config,
            }}
            disabled={!props.config.draft}
            openRemoveModal={openRemoveModal}
            openDuplicateModal={openDuplicateModal}
        />
    );
}
const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    authToken: state.authToken,
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
    removeConfig: reduxUtils.dispatchers.removeConfig(dispatch),
    addConfig: reduxUtils.dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
