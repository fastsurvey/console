import {constant, every, max, times} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    formUtils,
    templateUtils,
    localIdUtils,
    clipboardUtils,
    dataUtils,
    backend,
} from '@utilities';
import VisualEditor from './visual-editor';
import {types} from '@types';

function ConfigEditor(props: {
    account: types.Account;
    accessToken: types.AccessToken;

    configs: types.SurveyConfig[];
    centralConfig: types.SurveyConfig;
    setCentralConfig(config: types.SurveyConfig): void;

    configIsDiffering: boolean;
    markDiffering(d: boolean): void;

    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}) {
    const [submittingConfig, setSubmittingConfig] = useState(false);
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);
    const [fieldValidation, setFieldValidation] = useState<
        types.ValidationResult[]
    >([]);

    // Used for: survey_name is changed when editing, new survey
    const history = useHistory();

    useEffect(() => {
        // Switch between configs in editor
        setLocalConfigState(props.centralConfig);
        initValidators(props.centralConfig);
        // eslint-disable-next-line
    }, [props.centralConfig.survey_name]);

    function initValidators(config: types.SurveyConfig) {
        setFieldValidation(
            times(config.fields.length + 1, constant({valid: true})),
        );
    }

    function updateValidation(
        newIndex: number,
        newState: types.ValidationResult,
    ) {
        const newValidators = [...fieldValidation];
        newValidators[newIndex] = newState;
        setFieldValidation(newValidators);
    }

    function insertField(index: number, fieldType: types.FieldType) {
        setFieldValidation(
            dataUtils.array.insert(fieldValidation, index + 1, false),
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
            newFieldConfig = localIdUtils.initialize.field(
                newFieldConfig,
                localIdUtils.newId.field(localConfig),
            );
            newFieldConfig.identifier =
                templateUtils.fieldIdentifier(localConfig);

            setFieldValidation(
                dataUtils.array.insert(
                    fieldValidation,
                    index + 1,
                    formUtils.validateField(newFieldConfig),
                ),
            );
            const newFields = dataUtils.array.insert(
                localConfig.fields,
                index,
                newFieldConfig,
            );
            setLocalConfig({
                ...localConfig,
                fields: newFields,
            });
        }

        function error() {
            props.openMessage('warning-clipboard');
        }
        clipboardUtils.paste(success, error);
    }

    function removeField(index: number) {
        const fieldIdentifier = localConfig.fields[index].identifier;
        const maxIdentifier = localConfig.max_identifier;
        let newFields: types.SurveyField[] = dataUtils.array.remove(
            localConfig.fields,
            index,
        );

        if (fieldIdentifier > maxIdentifier) {
            newFields = newFields.map((f: types.SurveyField) => ({
                ...f,
                identifier:
                    f.identifier > fieldIdentifier
                        ? f.identifier - 1
                        : f.identifier,
            }));
        }

        setFieldValidation(dataUtils.array.remove(fieldValidation, index + 1));
        setLocalConfig({...localConfig, fields: newFields});
    }

    function saveState(configChanges?: object) {
        setSubmittingConfig(true);
        let combinedConfig: types.SurveyConfig = {
            ...localConfig,
            ...configChanges,
        };
        // @ts-ignore
        combinedConfig.max_identifier = max(
            combinedConfig.fields.map((f) => f.identifier),
        );
        props.closeAllMessages();

        const fieldsAreValid = every(fieldValidation.map((r) => r.valid));
        const fieldCountIsValid = localConfig.fields.length > 0;
        console.log({localConfig});
        const authModeIsValid =
            formUtils.validators.authMode(localConfig).valid;

        function success() {
            setLocalConfigState(combinedConfig);
            props.setCentralConfig(combinedConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        }

        function error(message: 'error-submissions-exist' | 'error-server') {
            console.log({message});
            props.openMessage(message);
        }

        if (fieldsAreValid && fieldCountIsValid && authModeIsValid) {
            backend.updateSurvey(
                props.account,
                props.accessToken,
                props.centralConfig.survey_name,
                combinedConfig,
                success,
                error,
            );
            setSubmittingConfig(false);
        } else {
            if (!fieldsAreValid) {
                props.openMessage('editor-warning-validators');
            }
            if (!fieldCountIsValid) {
                props.openMessage('editor-warning-field-count');
            }
            if (!authModeIsValid) {
                props.openMessage('editor-warning-authentication');
            }
            setSubmittingConfig(false);
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
        console.log({fieldConfigChanges, newIndex});
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
                updateValidation,
                fieldValidation,
                setLocalConfig,
                setLocalFieldConfig,
                insertField,
                pasteField,
                removeField,
                saveState,
                revertState,
                submittingConfig,
            }}
        />
    );
}

export default ConfigEditor;
