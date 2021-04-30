import {concat} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    validators,
    fieldTemplate,
    validateFormat,
    newFieldId,
    addLocalIds,
    validateField,
} from 'utilities';
import ControlStrip from './control-strip/control-strip';
import VisualEditor from './visual-editor';
import {AssertionError} from 'assert';
import {types} from 'types';

function insert(array: any[], index: number, element: any) {
    return concat(
        array.slice(0, index),
        element,
        array.slice(index, array.length),
    );
}

function remove(array: any[], index: number) {
    return concat(array.slice(0, index), array.slice(index + 1, array.length));
}

function ConfigEditor(props: {
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
        setLocalConfigState(props.centralConfig);
        initValidators(props.centralConfig);
    }, []);

    useEffect(() => {
        // Switch between configs in editor
        setLocalConfigState(props.centralConfig);
    }, [props.centralConfig.survey_name]);

    function initValidators(config: types.SurveyConfig) {
        const newValidators = [];
        for (let i = 0; i <= config.fields.length; i++) {
            newValidators.push(true);
        }
        setFieldValidators(newValidators);
    }

    function updateValidator(newIndex: number, newState: boolean) {
        const newValidators: boolean[] = fieldValidators.map((state, index) =>
            index !== newIndex ? state : newState,
        );
        /*
        if (fieldValidators.includes(false)) {
            props.closeAllMessages();
        }*/

        console.log(newValidators);
        setFieldValidators(newValidators);
    }

    function insertField(index: number, fieldType: types.FieldType) {
        setFieldValidators(insert(fieldValidators, index + 1, false));

        const field: types.SurveyField = fieldTemplate(fieldType, localConfig);
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

    function saveState() {
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
            // TODO: Push to backend and show error/success message
            props.setCentralConfig(localConfig);
            if (localConfig.survey_name !== props.centralConfig.survey_name) {
                history.push(`/configuration/${localConfig.survey_name}`);
            }
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
