import React from 'react';
import {connect} from 'react-redux';
import {ReduxState, SurveyConfig} from '../../../utilities/types';

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
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ConfigList);
