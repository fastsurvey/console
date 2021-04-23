import RemoveSurveyPopup from './remove-survey-popup';
import DuplicateSurveyPopup from './duplicate-survey-popup';
import React from 'react';
import {connect} from 'react-redux';
import {stateTypes, configTypes, validators, reduxUtils} from 'utilities';
import VisualSettings from './visual-settings';
import {useHistory} from 'react-router-dom';

interface Props {
    configs: configTypes.SurveyConfig[] | undefined;
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    updateValidator(newState: boolean): void;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    removeConfig(surveyName: string): void;
    duplicateConfig(
        newSurveyName: string,
        newConfig: configTypes.SurveyConfig,
    ): void;
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
        newConfig: configTypes.SurveyConfig,
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

        props.setConfig(newConfig);
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
        props.closeModal();
        history.push('/configurations');
        props.removeConfig(props.config.survey_name);
    }

    function openDuplicateModal() {
        props.openModal(
            'Duplicate this survey',
            <DuplicateSurveyPopup
                originalSurveyName={props.config.survey_name}
                duplicateSurvey={duplicateSurvey}
            />,
        );
    }
    function duplicateSurvey(newSurveyName: string) {
        props.closeModal();
        props.duplicateConfig(newSurveyName, props.config);
        history.push(`/configuration/${newSurveyName}`);
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
const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
    removeConfig: reduxUtils.dispatchers.removeConfig(dispatch),
    duplicateConfig: reduxUtils.dispatchers.duplicateConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
