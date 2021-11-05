import React from 'react';
import {connect} from 'react-redux';
import {types} from '/src/types';
import {formUtils, reduxUtils} from '/src/utilities';

import VisualSettings from './visual-settings';

interface Props {
    account: types.Account;
    accessToken: types.AccessToken;
    centralConfigName: string;
    openMessage(messageId: types.MessageId): void;
    configIsDiffering: boolean;

    configs: types.SurveyConfig[];
    config: types.SurveyConfig;
    setLocalConfig(config: object): void;
    updateValidation(newState: types.ValidationResult): void;
    validation: types.ValidationResult;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;

    disabled: boolean;
}
function Settings(props: Props) {
    function updateConfig(newConfig: types.SurveyConfig) {
        if (props.configs) {
            props.updateValidation(
                formUtils.validateSettings(props.configs, newConfig),
            );
        }
        props.setLocalConfig(newConfig);
    }

    return (
        <VisualSettings
            updateConfig={updateConfig}
            configs={props.configs}
            config={props.config}
            commonProps={{
                updateConfig,
                disabled: props.disabled,
                config: props.config,
            }}
            disabled={props.disabled}
            validation={props.validation}
        />
    );
}
const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
