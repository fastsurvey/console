import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ReduxState, SurveyConfig} from '../../../utilities/types';
import ConfigPreviewPanel from './ConfigPreviewPanel';

interface ConfigEditorProps {
    configs: undefined | SurveyConfig[];
}
function ConfigEditor(props: ConfigEditorProps) {
    let params = useParams();

    if (!props.configs) {
        return (
            <React.Fragment>
                <h3>Configurations</h3>
                <p>Loading surveys ...</p>
            </React.Fragment>
        );
    }

    const filteredConfigs = props.configs.filter((config) => {
        // @ts-ignore
        return config.survey_name === params.survey_name;
    });

    if (filteredConfigs.length === 0) {
        return (
            <React.Fragment>
                <h3>Nothing here ...</h3>
                <p>404</p>
            </React.Fragment>
        );
    }

    const thisConfig: SurveyConfig = filteredConfigs[0];

    return (
        <div className='w-full center-content'>
            <div className='w-40vw'>
                <h3 className='text-center'>{thisConfig.title}</h3>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
