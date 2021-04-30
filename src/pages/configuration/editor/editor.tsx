import {concat, constant, times} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    validators,
    fieldTemplate,
    validateFormat,
    newFieldId,
    addLocalIds,
    validateField,
    dataUtils,
    backend,
} from 'utilities';
import ControlStrip from './control-strip/control-strip';
import VisualEditor from './visual-editor';
import {AssertionError} from 'assert';
import {types} from 'types';

function ConfigEditor(props: {
    account: types.Account;
    authToken: types.AuthToken;

    configs: types.SurveyConfig[];
    centralConfig: types.SurveyConfig;
    setCentralConfig(config: types.SurveyConfig): void;

    configIsDiffering: boolean;
    markDiffering(d: boolean): void;

    openMessage(message: types.Message): void;
    closeAllMessages(): void;
}) {
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);
    const [fieldValidators, setFieldValidators] = useState<boolean[]>([]);

    // Used for: survey_name is changed when editing, new survey
    const history = useHistory();

    useEffect(() => {
        // Switch between configs in editor
        setLocalConfigState(props.centralConfig);
        initValidators(props.centralConfig);
    }, [props.centralConfig.survey_name]);

    function initValidators(config: types.SurveyConfig) {
        setFieldValidators(times(config.fields.length + 1, constant(true)));
    }

    function updateValidator(newIndex: number, newState: boolean) {
        const newValidators = [...fieldValidators];
        newValidators[newIndex] = newState;
        setFieldValidators(newValidators);
    }

    function insertField(index: number, fieldType: types.FieldType) {
        setFieldValidators(dataUtils.insert(fieldValidators, index + 1, false));

        const field: types.SurveyField = fieldTemplate(fieldType, localConfig);
        setLocalConfig({
            ...localConfig,
            fields: dataUtils.insert(localConfig.fields, index, field),
        });
    }

    function pasteField(index: number) {
        navigator.clipboard.readText().then((text: string) => {
            try {
                const newField = JSON.parse(text);

                if (!validateFormat.fieldConfig(newField)) {
                    throw AssertionError;
                }

                setFieldValidators(
                    dataUtils.insert(
                        fieldValidators,
                        index + 1,
                        validateField(newField),
                    ),
                );

                const newConfig = {
                    ...localConfig,
                    fields: dataUtils.insert(
                        localConfig.fields,
                        index,
                        addLocalIds.field(newField, newFieldId(localConfig)),
                    ),
                };
                setLocalConfig(newConfig);
            } catch {
                props.openMessage({
                    text: 'Invalid text format on clipboard',
                    type: 'warning',
                });
                console.info('invalid text format on clipboard');
            }
        });
    }

    function removeField(index: number) {
        setFieldValidators(dataUtils.remove(fieldValidators, index + 1));
        setLocalConfig({
            ...localConfig,
            fields: dataUtils.remove(localConfig.fields, index),
        });
    }

    function saveState() {
        const fieldsAreValid = !fieldValidators.includes(false);
        const timingIsValid = validators.timing(localConfig);
        const authIsValid = validators.authMode(localConfig);
        const fieldOptionsAreValid = validators.fieldOptions(localConfig);

        function success() {
            props.closeAllMessages();
            props.setCentralConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        }

        function error() {
            props.openMessage({
                text: 'Backend error, please try again',
                type: 'error',
            });
        }

        if (
            fieldsAreValid &&
            timingIsValid &&
            authIsValid &&
            fieldOptionsAreValid
        ) {
            backend.updateSurvey(
                props.account,
                props.authToken,
                props.centralConfig.survey_name,
                localConfig,
                success,
                error,
            );
        } else {
            [
                {
                    pass: fieldsAreValid,
                    text: 'Invalid fields: Please check all red circles',
                },
                {
                    pass: timingIsValid,
                    text: 'End time has to be after start time',
                },
                {
                    pass: authIsValid,
                    text: 'Email-authentication requires unique email field',
                },
                {
                    pass: fieldOptionsAreValid,
                    text: 'Radio/Selection fields require at least 2 options',
                },
            ]
                .filter((c) => !c.pass)
                .forEach((c) => {
                    props.openMessage({text: c.text, type: 'error'});
                });
        }
    }

    function revertState() {
        props.markDiffering(false);
        props.closeAllMessages();
        setLocalConfigState(props.centralConfig);
        initValidators(props.centralConfig);
    }

    function setLocalConfig(configChanges: object) {
        // TODO: Add proper state comparison (localConfig === centralConfig)
        if (!props.configIsDiffering) {
            props.markDiffering(true);
        }
        setLocalConfigState({
            ...localConfig,
            ...configChanges,
        });
    }

    function setLocalFieldConfig(fieldConfigChanges: object, newIndex: number) {
        const newConfig = {
            ...localConfig,
        };

        newConfig.fields[newIndex] = {
            ...newConfig.fields[newIndex],
            ...fieldConfigChanges,
        };
        setLocalConfig(newConfig);
    }

    return (
        <>
            <ControlStrip
                config={props.centralConfig}
                setCentralConfig={props.setCentralConfig}
                saveState={saveState}
                revertState={revertState}
            />
            <VisualEditor
                centralConfigName={props.centralConfig.survey_name}
                localConfig={localConfig}
                updateValidator={updateValidator}
                setLocalConfig={setLocalConfig}
                setLocalFieldConfig={setLocalFieldConfig}
                insertField={insertField}
                pasteField={pasteField}
                removeField={removeField}
            />
        </>
    );
}

export default ConfigEditor;
