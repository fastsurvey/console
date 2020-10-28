import React from 'react';
import {connect} from 'react-redux';
import {ReduxState, SurveyConfig} from '../../../utilities/types';
import ConfigPreviewPanel from './ConfigPreviewPanel';

interface ConfigListProps {
    configs: undefined | SurveyConfig[];
}
function ConfigList(props: ConfigListProps) {
    return (
        <div>
            <h3>Configurations</h3>
            {!props.configs && (
                <React.Fragment>
                    <p>Loading surveys ...</p>
                </React.Fragment>
            )}
            {props.configs && props.configs.length === 0 && (
                <React.Fragment>
                    <p>No configs yet</p>
                </React.Fragment>
            )}
            {props.configs && props.configs.length > 0 && (
                <React.Fragment>
                    {props.configs.map((config, index) => (
                        <ConfigPreviewPanel
                            config={config}
                            index={index}
                            key={config.survey_name}
                        />
                    ))}
                    Add Survey
                </React.Fragment>
            )}
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
