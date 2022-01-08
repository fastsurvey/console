import React from 'react';
import {types} from '/src/types';
import EditorSettings from './components/editor-settings/editor-settings';
import Field from './components/fields/field';
import AddFieldPanel from './components/add-field-panel/add-field-panel';
import EditorHeader from './components/editor-header/editor-header';
import {reduce} from 'lodash';

function VisualEditor(props: {
    centralConfigName: string;
    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;
    setLocalFieldConfig(fieldConfigChanges: object, newIndex: number): void;

    updateValidation(newIndex: number, newState: types.ValidationResult): void;
    fieldValidation: types.ValidationResult[];

    insertField(index: number, fieldType: types.FieldType): void;
    pasteField(index: number): void;
    removeField(index: number): void;

    configIsDiffering: boolean;
    saveState(configChanges?: object): void;
    revertState(): void;

    submittingConfig: boolean;
}) {
    // TODO: Pretty empty state (no fields yet)

    const identifierToOrder = reduce(
        props.localConfig.fields.filter((f) =>
            ['email', 'selection', 'text'].includes(f.type),
        ),
        (acc, f, i) => ({...acc, [f.identifier]: i + 1}),
        {},
    );

    return (
        <div
            className={
                'w-full px-2 pt-4 pb-20 md:py-16 min-h-screen bg-gray-150 flex-col-top'
            }
        >
            <div className={'w-full max-w-3xl '}>
                <EditorHeader
                    localConfig={props.localConfig}
                    saveState={props.saveState}
                    revertState={props.revertState}
                    setLocalConfig={props.setLocalConfig}
                />
                <EditorSettings
                    centralConfigName={props.centralConfigName}
                    config={props.localConfig}
                    setLocalConfig={props.setLocalConfig}
                    updateValidation={(newState: types.ValidationResult) =>
                        props.updateValidation(0, newState)
                    }
                    validation={props.fieldValidation[0]}
                    disabled={props.submittingConfig}
                />
                {props.localConfig.fields.map((fieldConfig, index) => (
                    <div className='w-full' key={fieldConfig.local_id}>
                        <AddFieldPanel
                            insertField={(fieldType: types.FieldType) =>
                                props.insertField(index, fieldType)
                            }
                            pasteField={() => props.pasteField(index)}
                            disabled={props.submittingConfig}
                            index={index}
                        />
                        <Field
                            identifierToOrder={identifierToOrder}
                            fieldIndex={index}
                            fieldConfig={fieldConfig}
                            setLocalFieldConfig={(newFieldConfig: object) =>
                                props.setLocalFieldConfig(newFieldConfig, index)
                            }
                            configIsDiffering={props.configIsDiffering}
                            disabled={props.submittingConfig}
                            updateValidation={(newState: types.ValidationResult) =>
                                props.updateValidation(index + 1, newState)
                            }
                            removeField={() => props.removeField(index)}
                            validation={props.fieldValidation[index + 1]}
                        />
                    </div>
                ))}
                <AddFieldPanel
                    insertField={(fieldType: types.FieldType) =>
                        props.insertField(props.localConfig.fields.length, fieldType)
                    }
                    pasteField={() => props.pasteField(props.localConfig.fields.length)}
                    disabled={props.submittingConfig}
                    index={props.localConfig.fields.length}
                />
            </div>
        </div>
    );
}

export default VisualEditor;
