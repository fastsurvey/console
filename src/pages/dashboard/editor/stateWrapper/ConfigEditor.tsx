import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ReduxState, SurveyConfig} from '../../../../utilities/types';
import EditorControlStrip from '../components/EditorControlStrip';
import GeneralConfig from '../components/GeneralConfig';
import {
    modifyConfigAction,
    markDifferingAction,
} from '../../../../utilities/reduxActions';
import FieldConfigForm from '../components/fields/FieldConfigForm';

interface ConfigEditorProps {
    centralConfig: SurveyConfig;
    modifyConfig(config: SurveyConfig): void;
    markDiffering(differing: boolean): void;
}
function ConfigEditor(props: ConfigEditorProps) {
    const [localConfig, setLocalConfigState] = useState(props.centralConfig);

    useEffect(() => {
        setLocalConfigState(props.centralConfig);
    }, [props.centralConfig, props.centralConfig.local_id]);

    function syncState() {
        // TODO: Validate & Push to backend
        props.modifyConfig(localConfig);
    }

    function revertState() {
        props.markDiffering(false);
        setLocalConfigState(props.centralConfig);
    }

    function setLocalConfig(config: SurveyConfig) {
        // TODO: Add proper state comparison
        props.markDiffering(true);
        setLocalConfigState(config);
    }

    return (
        <div
            id='ConfigEditor'
            className='flex flex-col items-center px-8 pt-4 pb-12 no-selection'
        >
            <EditorControlStrip
                config={localConfig}
                setConfig={setLocalConfig}
                syncState={syncState}
                revertState={revertState}
            />
            <GeneralConfig config={localConfig} setConfig={setLocalConfig} />
            {localConfig.fields.map((fieldConfig) => (
                <FieldConfigForm
                    key={fieldConfig.type + fieldConfig.title}
                    fieldConfig={fieldConfig}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: (config: SurveyConfig) =>
        dispatch(modifyConfigAction(config)),
    markDiffering: (differing: boolean) =>
        dispatch(markDifferingAction(differing)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
