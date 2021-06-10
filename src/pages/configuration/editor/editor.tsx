import {constant, times} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    formUtils,
    templateUtils,
    localIdUtils,
    clipboardUtils,
    dataUtils,
    backend,
} from 'utilities';
import VisualEditor from './visual-editor';
import {types} from 'types';

function ConfigEditor(props: {
    account: types.Account;
    authToken: types.AuthToken;

    configs: types.SurveyConfig[];
    centralConfig: types.SurveyConfig;
    setCentralConfig(config: types.SurveyConfig): void;

    configIsDiffering: boolean;
    markDiffering(d: boolean): void;

    openMessage(messageId: types.MessageId): void;
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
        // eslint-disable-next-line
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
        setFieldValidators(
            dataUtils.array.insert(fieldValidators, index + 1, false),
        );

        const field: types.SurveyField = templateUtils.field(
            fieldType,
            localConfig,
        );
        setLocalConfig({
            ...localConfig,
            fields: dataUtils.array.insert(localConfig.fields, index, field),
        });
    }

    function pasteField(index: number) {
        function success(newFieldConfig: types.SurveyField) {
            setFieldValidators(
                dataUtils.array.insert(
                    fieldValidators,
                    index + 1,
                    formUtils.validateField(newFieldConfig),
                ),
            );

            const newConfig = {
                ...localConfig,
                fields: dataUtils.array.insert(
                    localConfig.fields,
                    index,
                    localIdUtils.initialize.field(
                        newFieldConfig,
                        localIdUtils.newId.field(localConfig),
                    ),
                ),
            };
            setLocalConfig(newConfig);
        }

        function error() {
            props.openMessage('warning-clipboard');
        }
        clipboardUtils.paste(success, error);
    }

    function removeField(index: number) {
        setFieldValidators(dataUtils.array.remove(fieldValidators, index + 1));
        setLocalConfig({
            ...localConfig,
            fields: dataUtils.array.remove(localConfig.fields, index),
        });
    }

    // modifyDraft = true -> convert drafts to published surveys and vice versa
    function saveState(configChanges: object = {}) {
        const combinedConfig = {
            ...localConfig,
            ...configChanges,
        };
        props.closeAllMessages();

        const fieldsAreValid = !fieldValidators.includes(false);
        const fieldCountIsValid = localConfig.fields.length > 0;
        const timingIsValid = formUtils.validators.timing(localConfig);
        const authIsValid = formUtils.validators.authMode(localConfig);
        const fieldOptionsAreValid =
            formUtils.validators.fieldOptions(localConfig);

        function success() {
            setLocalConfigState(combinedConfig);
            props.setCentralConfig(combinedConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        }

        function error() {
            props.openMessage('error-server');
        }

        if (
            fieldsAreValid &&
            fieldCountIsValid &&
            timingIsValid &&
            authIsValid &&
            fieldOptionsAreValid
        ) {
            backend.updateSurvey(
                props.account,
                props.authToken,
                props.centralConfig.survey_name,
                combinedConfig,
                success,
                error,
            );
        } else {
            if (!fieldsAreValid) {
                props.openMessage('editor-warning-validators');
            }
            if (!fieldCountIsValid) {
                props.openMessage('editor-warning-field-count');
            }
            if (!timingIsValid) {
                props.openMessage('editor-warning-timing');
            }
            if (!authIsValid) {
                props.openMessage('editor-warning-authentication');
            }
            if (!fieldOptionsAreValid) {
                props.openMessage('editor-warning-option-list');
            }
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
        <VisualEditor
            centralConfigName={props.centralConfig.survey_name}
            {...{
                localConfig,
                updateValidator,
                setLocalConfig,
                setLocalFieldConfig,
                insertField,
                pasteField,
                removeField,
                saveState,
                revertState,
            }}
        />
    );
}

export default ConfigEditor;
