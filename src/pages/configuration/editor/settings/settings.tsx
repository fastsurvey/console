import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {types} from '@types';
import {formUtils, reduxUtils, backend} from '@utilities';

import VisualSettings from './visual-settings';
import RemoveSurveyPopup from './remove-survey-popup';
import DuplicateSurveyPopup from './duplicate-survey-popup';
import VisualSettingsOld from './visual-settings-old';

interface Props {
    account: types.Account;
    authToken: types.AuthToken;
    centralConfigName: string;
    openMessage(messageId: types.MessageId): void;
    configIsDiffering: boolean;

    configs: types.SurveyConfig[] | undefined;
    config: types.SurveyConfig;
    setLocalConfig(config: object): void;
    updateValidation(newState: types.ValidationResult): void;
    validation: types.ValidationResult;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    removeConfig(surveyName: string): void;
    addConfig(newConfig: types.SurveyConfig): void;
}
function Settings(props: Props) {
    let history = useHistory();

    function updateConfig(newConfig: types.SurveyConfig) {
        if (props.configs) {
            props.updateValidation(
                formUtils.validateSettings(props.configs, newConfig),
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
            props.openMessage('error-server');
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
            props.openMessage('warning-unsaved');
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
        <>
            <VisualSettings
                updateConfig={updateConfig}
                config={props.config}
                commonProps={{
                    updateConfig,
                    disabled: !props.config.draft,
                    config: props.config,
                }}
                disabled={!props.config.draft}
                openRemoveModal={openRemoveModal}
                openDuplicateModal={openDuplicateModal}
                validation={props.validation}
            />
            <VisualSettingsOld
                updateConfig={updateConfig}
                config={props.config}
                commonProps={{
                    updateConfig,
                    disabled: !props.config.draft,
                    config: props.config,
                }}
                disabled={!props.config.draft}
                openRemoveModal={openRemoveModal}
                openDuplicateModal={openDuplicateModal}
                validation={props.validation}
            />
        </>
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
