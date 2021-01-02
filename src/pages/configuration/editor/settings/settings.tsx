import RemoveSurveyPopup from 'pages/configuration/editor/settings/remove-survey-popup';
import React from 'react';
import {connect} from 'react-redux';
import {stateTypes, configTypes, validators, dispatchers} from 'utilities';
import VisualSettings from './visual-settings';

interface Props {
    configs: configTypes.SurveyConfig[] | undefined;
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    updateValidator(newState: boolean): void;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
}
function Settings(props: Props) {
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
                    submissionLimitIsValid(newConfig.submission_limit),
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

    function removeSurvey() {}

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
        />
    );
}
const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: dispatchers.openModal(dispatch),
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
