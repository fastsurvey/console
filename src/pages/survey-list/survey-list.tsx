import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {reduxUtils, templateUtils, localIdUtils, backend} from '/src/utilities';
import {cloneDeep} from 'lodash';
import {types} from '/src/types';
import VisualConfigList from './visual-survey-list';
import RemoveSurveyPopup from './components/remove-survey-popup';
import DuplicateSurveyPopup from './components/duplicate-survey-popup';
import ResetSubmissionsPopup from './components/reset-submissions-popup';

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
        function error(reason: 'authentication' | 'server') {
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

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
            props.openMessage('success-survey-list-survey-removed');
        }

        function error(reason: 'authentication' | 'server') {
            props.closeModal();
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

        backend.deleteSurvey(
            props.account,
            props.accessToken,
            config.survey_name,
            success,
            error,
        );
    };

    const resetSubmissions = (config: types.SurveyConfig) => () => {
        function success() {
            props.closeModal();
            props.openMessage('success-survey-list-submissions-removed');
        }

        function error(reason: 'authentication' | 'server') {
            props.closeModal();
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

        backend.deleteSubmissions(
            props.account,
            props.accessToken,
            config.survey_name,
            success,
            error,
        );
    };

    const duplicateSurvey = (config: types.SurveyConfig) => (newSurveyName: string) => {
        const newConfig = {
            ...config,
            survey_name: newSurveyName,
            fields: config.fields.map((f, i) => ({...cloneDeep(f), identifier: i})),
        };

        const success = () => {
            props.addConfig(newConfig);
            props.closeModal();
            history.push(`/editor/${newSurveyName}`);
            props.openMessage('success-survey-list-duplication');
        };
        function error(reason: 'authentication' | 'server') {
            switch (reason) {
                case 'authentication':
                    props.openMessage('error-access-token');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
        }

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

    const openResetModal = (config: types.SurveyConfig) => () => {
        props.openModal(
            "Remove this survey's submissions?",
            <ResetSubmissionsPopup
                resetSubmissions={resetSubmissions(config)}
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
            openResetModal={openResetModal}
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
