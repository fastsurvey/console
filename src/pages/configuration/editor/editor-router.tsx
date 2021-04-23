import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {reduxUtils} from 'utilities';
import Editor from './editor';
import {types} from 'types';

interface Props {
    configs: undefined | types.SurveyConfig[];
    modifyConfig(config: types.SurveyConfig): void;
    markDiffering(differing: boolean): void;
    openMessage(message: types.Message): void;
    closeAllMessages(): void;
}
function EditorRouter(props: Props) {
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
            configs={props.configs}
            centralConfig={filteredConfigs[0]}
            modifyConfig={props.modifyConfig}
            markDiffering={props.markDiffering}
            openMessage={props.openMessage}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    configs: state.configs,
});
const mapDispatchToProps = (dispatch: any) => ({
    modifyConfig: reduxUtils.dispatchers.modifyConfig(dispatch),
    markDiffering: reduxUtils.dispatchers.markDiffering(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorRouter);
