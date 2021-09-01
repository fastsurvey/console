import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {reduxUtils, backend, templateUtils} from '@utilities';
import {types} from '@types';
import VisualConfigList from './visual-config-list';
interface Props {
    account: types.Account;
    accessToken: types.AccessToken;

    configs: types.SurveyConfig[];
    openMessage(messageId: types.MessageId): void;
    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    addConfig(config: types.SurveyConfig): void;
}
function ConfigList(props: Props) {
    let history = useHistory();

    function addSurvey() {
        const newConfig = templateUtils.survey(props.configs);

        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/configuration/${newConfig.survey_name}`);
        };
        const error = (code: 400 | 401 | 422 | 500) => {};

        backend.createSurvey(
            props.account,
            props.accessToken,
            newConfig,
            success,
            error,
        );
    }

    return (
        <VisualConfigList
            configs={props.configs}
            addSurvey={addSurvey}
            account={props.account}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
    accessToken: state.accessToken,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
    addConfig: reduxUtils.dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
