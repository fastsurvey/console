import React from 'react';
import {connect} from 'react-redux';
import {stateTypes, configTypes, validators} from 'utilities';
import VisualSettings from './visual-settings';

interface SettingsProps {
    configs: configTypes.SurveyConfig[] | undefined;
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    updateValidator(newState: boolean): void;
}
function Settings(props: SettingsProps) {
    const titleIsValid = validators.title;
    const surveyNameIsValid = validators.surveyName(
        props.configs,
        props.config,
    );
    const descriptionIsValid = validators.description;
    const submissionLimitIsValid = validators.submissionLimit;

    function updateConfig(newConfig: configTypes.SurveyConfig) {
        props.updateValidator(
            titleIsValid(newConfig.title) &&
                surveyNameIsValid(newConfig.survey_name) &&
                descriptionIsValid(newConfig.description) &&
                submissionLimitIsValid(newConfig.submission_limit),
        );
        props.setConfig(newConfig);
    }

    return (
        <VisualSettings
            {...{updateConfig, surveyNameIsValid}}
            config={props.config}
            setConfig={props.setConfig}
            updateValidator={props.updateValidator}
            commonProps={{
                updateConfig,
                disabled: !props.config.draft,
                config: props.config,
            }}
        />
    );
}
const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
