import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
    Message,
    ReduxState,
    SurveyConfig,
    SurveyField,
} from '../../../../utilities/types';
import EditorControlStrip from './controlStrip/EditorControlStrip';
import GeneralConfig from './generalConfig/GeneralConfig';
import {
    modifyConfigAction,
    markDifferingAction,
    openMessageAction,
} from '../../../../utilities/reduxActions';
import FieldConfigForm from './fieldConfig/FieldConfigForm';
import {useHistory} from 'react-router-dom';
import {closeAllMessagesAction} from '../../../../utilities/reduxActions';

interface ConfigEditorProps {
    centralConfig: SurveyConfig;
    modifyConfig(config: SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: Message): void;
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
        console.log({validators});
        setValidators(
            validators.map((state, index) =>
                index !== newIndex ? state : newState,
            ),
        );
    }

    function syncState() {
        const settingsInvalid = validators.includes(false);
        const timingInvalid = localConfig.start >= localConfig.end;
        const authInvalid =
            localConfig.mode == 1 &&
            localConfig.fields.filter(
                (fieldConfig: SurveyField) => fieldConfig.type == 'Email',
            ).length != 1;

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

    function setLocalConfig(config: SurveyConfig) {
        // TODO: Add proper state comparison
        props.markDiffering(true);
        setLocalConfigState(config);
    }

    function setFieldConfig(newFieldConfig: SurveyField, newIndex: number) {
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
                className='flex flex-col items-center px-8 pb-12 no-selection'
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
                        setFieldConfig={(fieldConfig: SurveyField) =>
                            setFieldConfig(fieldConfig, index)
                        }
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

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: (config: SurveyConfig) =>
        dispatch(modifyConfigAction(config)),
    markDiffering: (differing: boolean) =>
        dispatch(markDifferingAction(differing)),
    openMessage: (message: Message) => dispatch(openMessageAction(message)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
