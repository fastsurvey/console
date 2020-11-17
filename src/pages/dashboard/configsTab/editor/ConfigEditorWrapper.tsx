import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import configTypes from 'utilities/types/configTypes';
import stateTypes from 'utilities/types/stateTypes';

import ConfigEditor from './ConfigEditor';

interface ConfigEditorWrappperProps {
    configs: undefined | configTypes.SurveyConfig[];
}
function ConfigEditorWrappper(props: ConfigEditorWrappperProps) {
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

    return <ConfigEditor centralConfig={filteredConfigs[0]} />;
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConfigEditorWrappper);
