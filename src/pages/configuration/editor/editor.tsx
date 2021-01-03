import {concat} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    stateTypes,
    configTypes,
    validators,
    fieldTemplate,
    validateFormat,
    newFieldId,
    addLocalIds,
    validateField,
} from 'utilities';
import VisualEditor from './visual-editor';
import {AssertionError} from 'assert';

interface Props {
    configs: configTypes.SurveyConfig[];
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

    function insert(array: any[], index: number, element: any) {
        return concat(
            array.slice(0, index),
            element,
            array.slice(index, array.length),
        );
    }

    function remove(array: any[], index: number) {
        return concat(
            array.slice(0, index),
            array.slice(index + 1, array.length),
        );
    }

    function insertField(index: number, fieldType: configTypes.FieldType) {
        setFieldValidators(insert(fieldValidators, index + 1, false));

        const field: configTypes.SurveyField = fieldTemplate(
            fieldType,
            localConfig,
        );
        setLocalConfig({
            ...localConfig,
            fields: insert(localConfig.fields, index, field),
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
                    insert(fieldValidators, index + 1, validateField(newField)),
                );

                const newConfig = {
                    ...localConfig,
                    fields: insert(
                        localConfig.fields,
                        index,
                        addLocalIds.field(newField, newFieldId(localConfig)),
                    ),
                };
                setLocalConfig(newConfig);
            } catch {
                // TODO: Show message on unsuccessful paste
                console.info('invalid text format on clipoard');
            }
        });
    }

    function removeField(index: number) {
        setFieldValidators(remove(fieldValidators, index + 1));
        setLocalConfig({
            ...localConfig,
            fields: remove(localConfig.fields, index),
        });
    }

    function publishState() {
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
            props.closeAllMessages();
            const publishedConfig: configTypes.SurveyConfig = {
                ...localConfig,
                draft: false,
            };
            // TODO: Push to backend and show error/success message
            props.modifyConfig(publishedConfig);
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
    function saveState() {
        const validSurveyName = validators.surveyName(
            props.configs,
            localConfig,
        )(localConfig.survey_name);

        if (validSurveyName) {
            props.closeAllMessages();
            // TODO: Push to backend and show error/success message
            props.modifyConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
        } else {
            props.openMessage({
                text: 'Invalid survey identifier',
                type: 'error',
            });
        }
    }

    function revertState() {
        props.markDiffering(false);
        props.closeAllMessages();
        const newValidators = [];
        for (let i = 0; i <= props.centralConfig.fields.length; i++) {
            newValidators.push(true);
        }
        setFieldValidators(newValidators);
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
            saveState={saveState}
            publishState={publishState}
            revertState={revertState}
            localConfig={localConfig}
            setLocalConfigState={setLocalConfigState}
            updateValidator={updateValidator}
            setLocalConfig={setLocalConfig}
            setFieldConfig={setFieldConfig}
            insertField={insertField}
            pasteField={pasteField}
            removeField={removeField}
        />
    );
}

export default ConfigEditor;
