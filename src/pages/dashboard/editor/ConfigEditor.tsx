import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ReduxState, SurveyConfig} from '../../../utilities/types';
import EditorControlStrip from './components/EditorControlStrip';
import GeneralConfig from './components/GeneralConfig';

interface ConfigEditorProps {
    configs: undefined | SurveyConfig[];
}
function ConfigEditor(props: ConfigEditorProps) {
    let params = useParams();

    if (!props.configs) {
        return (
            <div id='ConfigEditor'>
                <h3>Configurations</h3>
                <p>Loading surveys ...</p>
            </div>
        );
    }

    const filteredConfigs = props.configs.filter((config) => {
        // @ts-ignore
        return config.survey_name === params.survey_name;
    });

    if (filteredConfigs.length === 0) {
        return (
            <div id='ConfigEditor'>
                <h3>Nothing here ...</h3>
                <p>404</p>
            </div>
        );
    }

    const thisConfig: SurveyConfig = filteredConfigs[0];

    return (
        <div
            id='ConfigEditor'
            className='flex flex-col items-center px-8 pt-4 pb-12'
        >
            <EditorControlStrip config={thisConfig} />
            <GeneralConfig config={thisConfig} />
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
