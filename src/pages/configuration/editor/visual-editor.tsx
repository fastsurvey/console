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
                id='ConfigEditor'
                className='flex flex-col items-center px-8 pb-64 no-selection'
                style={{paddingTop: 'calc(6rem - 4px)'}}
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
