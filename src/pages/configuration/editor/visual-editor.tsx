import React from 'react';
import {types} from 'types';
import Settings from './settings/settings';
import Field from './fields/field';
import AddFieldPanel from './add-field-panel/add-field-panel';

function VisualEditor(props: {
    centralConfigName: string;
    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;
    setLocalFieldConfig(fieldConfigChanges: object, newIndex: number): void;

    updateValidator(newIndex: number, newState: boolean): void;

    insertField(index: number, fieldType: types.FieldType): void;
    pasteField(index: number): void;
    removeField(index: number): void;

    saveState(): void;
    revertState(): void;
}) {
    return (
        <div className={'w-full py-16 min-h-screen bg-gray-100 centering-col'}>
            <div className={'w-full max-w-3xl '}>
                <Settings
                    centralConfigName={props.centralConfigName}
                    config={props.localConfig}
                    setLocalConfig={props.setLocalConfig}
                    updateValidator={(newState: boolean) =>
                        props.updateValidator(0, newState)
                    }
                />
                {props.localConfig.fields.map((fieldConfig, index) => (
                    <div className='w-full' key={fieldConfig.local_id}>
                        <AddFieldPanel
                            insertField={(fieldType: types.FieldType) =>
                                props.insertField(index, fieldType)
                            }
                            pasteField={() => props.pasteField(index)}
                        />
                        <Field
                            fieldConfig={fieldConfig}
                            setLocalFieldConfig={(newFieldConfig: object) =>
                                props.setLocalFieldConfig(newFieldConfig, index)
                            }
                            disabled={!props.localConfig.draft}
                            updateValidator={(newState: boolean) =>
                                props.updateValidator(1 + index, newState)
                            }
                            removeField={() => props.removeField(index)}
                        />
                    </div>
                ))}
                <AddFieldPanel
                    insertField={(fieldType: types.FieldType) =>
                        props.insertField(
                            props.localConfig.fields.length,
                            fieldType,
                        )
                    }
                    pasteField={() =>
                        props.pasteField(props.localConfig.fields.length)
                    }
                />
            </div>
        </div>
    );
}

export default VisualEditor;
