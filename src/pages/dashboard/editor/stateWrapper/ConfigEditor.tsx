import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ReduxState, SurveyConfig} from '../../../../utilities/types';
import EditorControlStrip from '../components/EditorControlStrip';
import GeneralConfig from '../components/GeneralConfig';
import {modifyConfigAction} from '../../../../utilities/reduxActions';

interface ConfigEditorProps {
    configs: SurveyConfig[] | undefined;
    centralConfig: SurveyConfig;
    modifyConfig(survey_name: string, config: SurveyConfig): void;
}
function ConfigEditor(props: ConfigEditorProps) {
    const [localConfig, setLocalConfig] = useState(props.centralConfig);
    const [survey_name, set_survey_name] = useState(
        props.centralConfig.survey_name,
    );

    useEffect(() => {
        setLocalConfig(props.centralConfig);
        set_survey_name(props.centralConfig.survey_name);

        // returned function will be called on component unmount
        return () => {
            props.modifyConfig(survey_name, localConfig);
        };
    }, [props.centralConfig, props.centralConfig.survey_name]);

    return (
        <div
            id='ConfigEditor'
            className='flex flex-col items-center px-8 pt-4 pb-12'
        >
            <EditorControlStrip config={localConfig} />
            <GeneralConfig config={localConfig} />
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: (survey_name: string, config: SurveyConfig) =>
        dispatch(modifyConfigAction(survey_name, config)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
