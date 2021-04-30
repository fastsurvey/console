import React from 'react';
import {types} from 'types';
import Settings from './settings/settings';
import Field from './fields/field';
import AddFieldPanel from './add-field-panel/add-field-panel';

function VisualEditor(props: {
    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;
    setLocalFieldConfig(fieldConfigChanges: object, newIndex: number): void;

    updateValidator(newIndex: number, newState: boolean): void;

    insertField(index: number, fieldType: types.FieldType): void;
    pasteField(index: number): void;
    removeField(index: number): void;
}) {
    return (
        <div
            className={
                'left-0 right-0 min-h-screen flex flex-col items-center ' +
                'pt-10 px-8 bg-gray-100 no-selection ' +
                'pb-64 lg:ml-104 xl:ml-124 2xl:ml-144 '
            }
        >
            <Settings
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
    );
}

export default VisualEditor;
