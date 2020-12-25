import React from 'react';
import {configTypes} from 'utilities';
import ControlStrip from './control-strip/control-strip';
import Settings from './settings/settings';
import FieldConfigForm from './fields/field/field';

interface Props {
    centralConfig: configTypes.SurveyConfig;
    modifyConfig(config: configTypes.SurveyConfig): void;
    syncState(): void;
    revertState(): void;

    localConfig: configTypes.SurveyConfig;
    setLocalConfigState(config: configTypes.SurveyConfig): void;

    updateValidator(newIndex: number, newState: boolean): void;
    setLocalConfig(config: configTypes.SurveyConfig): void;
    setFieldConfig(
        newFieldConfig: configTypes.SurveyField,
        newIndex: number,
    ): void;
}
function VisualEditor(props: Props) {
    return (
        <React.Fragment>
            <ControlStrip
                config={props.centralConfig}
                setConfig={props.modifyConfig}
                syncState={props.syncState}
                revertState={props.revertState}
            />
            <div
                className={
                    'left-0 right-0 flex flex-col items-center ' +
                    'pt-12 px-8 bg-gray-100 no-selection ' +
                    'pb-64 lg:ml-104 xl:ml-124 2xl:ml-144 '
                }
            >
                <Settings
                    config={props.localConfig}
                    setConfig={props.setLocalConfig}
                    updateValidator={(newState: boolean) =>
                        props.updateValidator(0, newState)
                    }
                />
                {props.localConfig.fields.map((fieldConfig, index) => (
                    <FieldConfigForm
                        key={fieldConfig.local_id}
                        fieldConfig={fieldConfig}
                        setFieldConfig={(
                            newFieldConfig: configTypes.SurveyField,
                        ) => props.setFieldConfig(newFieldConfig, index)}
                        disabled={!props.localConfig.draft}
                        updateValidator={(newState: boolean) =>
                            props.updateValidator(1 + index, newState)
                        }
                    />
                ))}
            </div>
        </React.Fragment>
    );
}

export default VisualEditor;
