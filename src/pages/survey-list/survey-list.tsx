import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {reduxUtils, templateUtils, localIdUtils, backend} from '/src/utilities';
import {types} from '/src/types';
import VisualConfigList from './visual-survey-list';
import RemoveSurveyPopup from './components/remove-survey-popup';
import DuplicateSurveyPopup from './components/duplicate-survey-popup';

interface Props {
    account: types.Account;
    accessToken: types.AccessToken;

    configs: types.SurveyConfig[];
    openMessage(messageId: types.MessageId): void;
    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    removeConfig(surveyName: string): void;
    addConfig(config: types.SurveyConfig): void;
}
function SurveyList(props: Props) {
    let history = useHistory();

    function addSurvey() {
        const newConfig = templateUtils.survey(props.configs);

        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/editor/${newConfig.survey_name}`);
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

    const removeSurvey = (config: types.SurveyConfig) => () => {
        function success() {
            props.removeConfig(config.survey_name);
            props.closeModal();
            props.openMessage('success-survey-removed');
        }

        function error() {
            props.closeModal();
            props.openMessage('error-server');
        }

        backend.deleteSurvey(
            props.account,
            props.accessToken,
            config.survey_name,
            success,
            error,
        );
    };

    const duplicateSurvey = (config: types.SurveyConfig) => (newSurveyName: string) => {
        const newConfig = localIdUtils.remove.survey({
            ...config,
            survey_name: newSurveyName,
            draft: true,
            fields: config.fields.map((f, i) => ({...f, identifier: i})),
        });

        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/editor/${newSurveyName}`);
            props.openMessage('success-survey-duplicated');
        };
        const error = (code: 400 | 401 | 422 | 500) => {};

        backend.createSurvey(
            props.account,
            props.accessToken,
            newConfig,
            success,
            error,
        );
    };

    const openRemoveModal = (config: types.SurveyConfig) => () => {
        props.openModal(
            'Remove this survey permanently?',
            <RemoveSurveyPopup
                removeSurvey={removeSurvey(config)}
                closeModal={props.closeModal}
            />,
        );
    };

    const openDuplicateModal = (config: types.SurveyConfig) => () => {
        props.openModal(
            'Duplicate this survey?',
            <DuplicateSurveyPopup
                thisConfig={config}
                duplicateSurvey={duplicateSurvey(config)}
            />,
        );
    };

    return (
        <VisualConfigList
            configs={props.configs}
            addSurvey={addSurvey}
            account={props.account}
            openRemoveModal={openRemoveModal}
            openDuplicateModal={openDuplicateModal}
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
    removeConfig: reduxUtils.dispatchers.removeConfig(dispatch),
    addConfig: reduxUtils.dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);
