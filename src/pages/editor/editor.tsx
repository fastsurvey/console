import {cloneDeep, constant, every, max, times} from 'lodash';
import React, {useEffect, useState} from 'react';
import {flushSync} from 'react-dom';
import {useHistory} from 'react-router-dom';
import {
    formUtils,
    templateUtils,
    localIdUtils,
    clipboardUtils,
    backend,
    helperUtils,
} from '/src/utilities';
import VisualEditor from './visual-editor';
import {types} from '/src/types';

function Editor(props: {
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
    const [localValidations, setLocalValidations] = useState<types.ValidationResult[]>(
        times(props.centralConfig.fields.length + 1, constant({valid: true})),
    );

    // Used for: survey_name is changed when editing, new survey
    const history = useHistory();

    useEffect(() => {
        // Switch between configs in editor
        setLocalConfigState(props.centralConfig);
        initValidators(props.centralConfig);
        // eslint-disable-next-line
    }, [props.centralConfig.survey_name]);

    function initValidators(config: types.SurveyConfig) {
        setLocalValidations(times(config.fields.length + 1, constant({valid: true})));
    }

    function updateValidation(validation: types.ValidationResult, index: number) {
        const newValidators = JSON.parse(JSON.stringify(localValidations));
        newValidators[index] = validation;
        setLocalValidations(newValidators);
    }

    function insertField(index: number, fieldType: types.FieldType) {
        const newFieldConfig = templateUtils.field(fieldType, localConfig);
        const newFieldValidation = formUtils.validateField(newFieldConfig);
        setLocalValidations(
            helperUtils.insertIntoArray(
                localValidations,
                index + 1,
                newFieldValidation,
            ),
        );
        setLocalConfig({
            ...localConfig,
            fields: helperUtils.insertIntoArray(
                localConfig.fields,
                index,
                newFieldConfig,
            ),
        });
    }

    function pasteField(index: number) {
        function success(newFieldConfig: types.SurveyField) {
            newFieldConfig = localIdUtils.initialize.field(
                newFieldConfig,
                localIdUtils.newId.field(localConfig),
            );
            newFieldConfig.identifier = templateUtils.fieldIdentifier(localConfig);

            setLocalValidations(
                helperUtils.insertIntoArray(
                    localValidations,
                    index + 1,
                    formUtils.validateField(newFieldConfig),
                ),
            );
            const newFields = helperUtils.insertIntoArray(
                localConfig.fields,
                index,
                newFieldConfig,
            );
            setLocalConfig({
                ...localConfig,
                fields: newFields,
            });
        }

        function error(code: 'format' | 'support') {
            if (code === 'support') {
                props.openMessage('warning-editor-clipboard-support');
            } else {
                props.openMessage('warning-editor-clipboard');
            }
        }
        clipboardUtils.paste(success, error);
    }

    function removeField(index: number) {
        const fieldIdentifier = localConfig.fields[index].identifier;
        let newFields: types.SurveyField[] = helperUtils.removeFromArray(
            localConfig.fields,
            index,
        );

        if (fieldIdentifier >= localConfig.next_identifier) {
            newFields = newFields.map((f: types.SurveyField) => ({
                ...f,
                identifier:
                    f.identifier > fieldIdentifier ? f.identifier - 1 : f.identifier,
            }));
        }

        setLocalValidations(helperUtils.removeFromArray(localValidations, index + 1));
        setLocalConfig({...localConfig, fields: newFields});
    }

    function saveState(configChanges?: object) {
        setSubmittingConfig(true);
        let combinedConfig: types.SurveyConfig = {
            ...localConfig,
            ...configChanges,
        };
        const combinedMaxId: any = max(combinedConfig.fields.map((f) => f.identifier));
        combinedConfig.next_identifier = combinedMaxId + 1;

        const fieldsAreValid = every(localValidations.map((r) => r.valid));
        const authModeIsValid = formUtils.validators.authMode(localConfig).valid;

        function success() {
            props.closeAllMessages();
            setLocalConfigState(combinedConfig);
            props.setCentralConfig(combinedConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/editor/${localConfig.survey_name}`);
            }
        }

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

        if (fieldsAreValid && authModeIsValid) {
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
                props.openMessage('warning-editor-validators');
            }
            if (!authModeIsValid) {
                props.openMessage('warning-editor-authentication');
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

    function setLocalConfig(newLocalConfig: types.SurveyConfig) {
        // No proper state comparison since the config update should be really
        // fast. A deep comparison of centralConfig and localConfig is too expensive
        // in my opinion 10ms more input delay on an M1 Pro Chip..
        if (!props.configIsDiffering) {
            flushSync(() => props.markDiffering(true));
        }
        setLocalConfigState(cloneDeep(newLocalConfig));
    }

    function setLocalSettingsConfig(configChanges: types.SurveyConfigChange) {
        const newConfig: types.SurveyConfig = {
            ...cloneDeep(localConfig),
            ...configChanges,
        };

        setLocalConfig(newConfig);
        updateValidation(formUtils.validateSettings(props.configs, newConfig), 0);
    }

    function setLocalFieldConfig(
        fieldConfigChanges: types.SurveyFieldChange,
        index: number,
    ) {
        const newConfig = JSON.parse(JSON.stringify(localConfig));

        newConfig.fields[index] = {
            ...newConfig.fields[index],
            ...fieldConfigChanges,
        };

        setLocalConfig(newConfig);
        updateValidation(formUtils.validateField(newConfig.fields[index]), index + 1);
    }

    return (
        <VisualEditor
            centralConfigName={props.centralConfig.survey_name}
            configIsDiffering={props.configIsDiffering}
            settingsValidation={localValidations[0]}
            fieldValidations={localValidations.slice(1)}
            {...{
                localConfig,
                setLocalSettingsConfig,
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

export default Editor;
