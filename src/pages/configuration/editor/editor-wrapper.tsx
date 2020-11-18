import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {stateTypes, configTypes, dispatchers} from 'utilities';
import Editor from './editor';

interface EditorWrappperProps {
    configs: undefined | configTypes.SurveyConfig[];
    modifyConfig(config: configTypes.SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function EditorWrappper(props: EditorWrappperProps) {
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

    return (
        <Editor
            centralConfig={filteredConfigs[0]}
            modifyConfig={props.modifyConfig}
            markDiffering={props.markDiffering}
            openMessage={props.openMessage}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: dispatchers.modifyConfig(dispatch),
    markDiffering: dispatchers.markDiffering(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorWrappper);
