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

interface ConfigEditorProps {
    centralConfig: SurveyConfig;
    modifyConfig(config: SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: Message): void;
}
function ConfigEditor(props: ConfigEditorProps) {
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);
    const [validationErrors, setValidationErrors] = useState([]);

    let history = useHistory();

    useEffect(() => {
        setLocalConfigState(props.centralConfig);
    }, [props.centralConfig, props.centralConfig.local_id]);

    function syncState() {
        const settingsInvalid = validationErrors.length !== 0;
        const timingInvalid = localConfig.start >= localConfig.end;

        if (settingsInvalid || timingInvalid) {
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
        } else {
            // TODO: Try to push to backend
            props.modifyConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        }
    }

    function revertState() {
        props.markDiffering(false);
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
                />
                {localConfig.fields.map((fieldConfig, index) => (
                    <FieldConfigForm
                        key={fieldConfig.local_id}
                        fieldConfig={fieldConfig}
                        setFieldConfig={(fieldConfig: SurveyField) =>
                            setFieldConfig(fieldConfig, index)
                        }
                        disabled={!localConfig.draft}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
