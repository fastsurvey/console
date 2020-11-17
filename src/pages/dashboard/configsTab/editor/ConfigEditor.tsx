import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import stateTypes from 'utilities/types/stateTypes';
import configTypes from 'utilities/types/configTypes';
import dispatcher from 'utilities/dispatcher';

import EditorControlStrip from './controlStrip/EditorControlStrip';
import GeneralConfig from './generalConfig/GeneralConfig';
import FieldConfigForm from './fieldConfig/FieldConfigForm';

interface ConfigEditorProps {
    centralConfig: configTypes.SurveyConfig;
    modifyConfig(config: configTypes.SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function ConfigEditor(props: ConfigEditorProps) {
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);
    const initialValidators: boolean[] = [];
    const [validators, setValidators] = useState(initialValidators);

    let history = useHistory();

    useEffect(() => {
        setLocalConfigState(props.centralConfig);
        const newValidators = [];
        for (let i = 0; i <= props.centralConfig.fields.length; i++) {
            newValidators.push(true);
        }
        setValidators(newValidators);
    }, [props.centralConfig, props.centralConfig.local_id]);

    function updateValidator(newIndex: number, newState: boolean) {
        const newValidators: boolean[] = validators.map((state, index) =>
            index !== newIndex ? state : newState,
        );
        setValidators(newValidators);
        if (!validators.includes(false)) {
            props.closeAllMessages();
        }
    }

    function syncState() {
        const settingsInvalid = validators.includes(false);
        const timingInvalid = localConfig.start >= localConfig.end;
        const authInvalid =
            localConfig.mode === 1 &&
            localConfig.fields.filter(
                (fieldConfig: configTypes.SurveyField) =>
                    fieldConfig.type === 'Email',
            ).length !== 1;
        const subfieldsInvalid =
            localConfig.fields.filter(
                (fieldConfig: configTypes.SurveyField) =>
                    (fieldConfig.type === 'Radio' ||
                        fieldConfig.type === 'Selection') &&
                    fieldConfig.fields.length < 2,
            ).length > 0;

        if (settingsInvalid || timingInvalid || authInvalid) {
            if (settingsInvalid) {
                props.openMessage({
                    text: 'Invalid fields: Please check all red circles',
                    type: 'error',
                });
            }
            if (timingInvalid) {
                props.openMessage({
                    text: 'End time before start time',
                    type: 'error',
                });
            }
            if (authInvalid) {
                props.openMessage({
                    text: 'Email-authentication requires unique email field',
                    type: 'error',
                });
            }
            if (subfieldsInvalid) {
                props.openMessage({
                    text: 'Radio/Selection fields require at least 2 options',
                    type: 'error',
                });
            }
        } else {
            // TODO: Push to backend and show error/success message
            props.closeAllMessages();
            props.modifyConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        }
    }

    function revertState() {
        props.markDiffering(false);
        props.closeAllMessages();
        setLocalConfigState(props.centralConfig);
    }

    function setLocalConfig(config: configTypes.SurveyConfig) {
        // TODO: Add proper state comparison
        props.markDiffering(true);
        setLocalConfigState(config);
    }

    function setFieldConfig(
        newFieldConfig: configTypes.SurveyField,
        newIndex: number,
    ) {
        setLocalConfig({
            ...localConfig,
            fields: localConfig.fields.map((fieldConfig, index) =>
                index !== newIndex ? fieldConfig : newFieldConfig,
            ),
        });
    }

    return (
        <React.Fragment>
            <EditorControlStrip
                config={props.centralConfig}
                setConfig={props.modifyConfig}
                syncState={syncState}
                revertState={revertState}
            />
            <div
                id='ConfigEditor'
                className='flex flex-col items-center px-8 pb-64 no-selection'
                style={{paddingTop: 'calc(6rem - 4px)'}}
            >
                <GeneralConfig
                    config={localConfig}
                    setConfig={setLocalConfig}
                    updateValidator={(newState: boolean) =>
                        updateValidator(0, newState)
                    }
                />
                {localConfig.fields.map((fieldConfig, index) => (
                    <FieldConfigForm
                        key={fieldConfig.local_id}
                        fieldConfig={fieldConfig}
                        setFieldConfig={(
                            fieldConfig: configTypes.SurveyField,
                        ) => setFieldConfig(fieldConfig, index)}
                        disabled={!localConfig.draft}
                        updateValidator={(newState: boolean) =>
                            updateValidator(1 + index, newState)
                        }
                    />
                ))}
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: dispatcher.modifyConfig(dispatch),
    markDiffering: dispatcher.markDiffering(dispatch),
    openMessage: dispatcher.openMessage(dispatch),
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
