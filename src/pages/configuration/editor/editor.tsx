import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {stateTypes, configTypes, validators} from 'utilities';
import VisualEditor from './visual-editor';

interface Props {
    centralConfig: configTypes.SurveyConfig;
    modifyConfig(config: configTypes.SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function ConfigEditor(props: Props) {
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);
    const [fieldValidators, setFieldValidators] = useState<boolean[]>([]);

    // Used for: survey_name is changed when editing, new survey
    const history = useHistory();

    useEffect(() => {
        setLocalConfigState(props.centralConfig);
        const newValidators = [];
        for (let i = 0; i <= props.centralConfig.fields.length; i++) {
            newValidators.push(true);
        }
        setFieldValidators(newValidators);
    }, [props.centralConfig, props.centralConfig.local_id]);

    function updateValidator(newIndex: number, newState: boolean) {
        const newValidators: boolean[] = fieldValidators.map((state, index) =>
            index !== newIndex ? state : newState,
        );
        setFieldValidators(newValidators);
        if (!fieldValidators.includes(false)) {
            props.closeAllMessages();
        }
    }

    function syncState() {
        const fieldsAreValid = !fieldValidators.includes(false);
        const timingIsValid = validators.timing(localConfig);
        const authIsValid = validators.authMode(localConfig);
        const fieldOptionsAreValid = validators.fieldOptions(localConfig);

        if (
            fieldsAreValid &&
            timingIsValid &&
            authIsValid &&
            fieldOptionsAreValid
        ) {
            // TODO: Push to backend and show error/success message
            props.closeAllMessages();
            props.modifyConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        } else {
            const showConditionalError = (valid: boolean, text: string) => {
                if (!valid) {
                    props.openMessage({
                        text,
                        type: 'error',
                    });
                }
            };
            showConditionalError(
                fieldsAreValid,
                'Invalid fields: Please check all red circles',
            );
            showConditionalError(
                timingIsValid,
                'End time has to be after start time',
            );
            showConditionalError(
                authIsValid,
                'Email-authentication requires unique email field',
            );
            showConditionalError(
                fieldOptionsAreValid,
                'Radio/Selection fields require at least 2 options',
            );
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
        <VisualEditor
            centralConfig={props.centralConfig}
            modifyConfig={props.modifyConfig}
            syncState={syncState}
            revertState={revertState}
            localConfig={localConfig}
            setLocalConfigState={setLocalConfigState}
            updateValidator={updateValidator}
            setLocalConfig={setLocalConfig}
            setFieldConfig={setFieldConfig}
        />
    );
}

export default ConfigEditor;
