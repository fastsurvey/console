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

interface Props {
    configs: undefined | configTypes.SurveyConfig[];
    configIsDiffering: boolean;
    openMessage(message: stateTypes.Message): void;
    openModal(title: string, children: React.ReactNode): void;
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
        console.log(surveyName);

        if (props.configs !== undefined) {
            console.log('adding');
            props.addConfig(
                surveyTemplate('fastsurvey', surveyName, props.configs),
            );
        }
        // TODO: history.push to new config page
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
                <p className='w-full text-center'>No surveys yet</p>
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
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatchers.openMessage(dispatch),
    openModal: dispatchers.openModal(dispatch),
    addConfig: dispatchers.addConfig(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
