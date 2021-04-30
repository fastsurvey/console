import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {reduxUtils} from 'utilities';
import Editor from './editor';
import {types} from 'types';

interface Props {
    account: types.Account;
    authToken: types.AuthToken;

    configs: types.SurveyConfig[];
    setCentralConfig(config: types.SurveyConfig): void;
    openMessage(message: types.Message): void;
    closeAllMessages(): void;

    configIsDiffering: boolean;
    markDiffering(d: boolean): void;
}
function EditorRouter(props: Props) {
    let params = useParams();

    const filteredConfigs = props.configs.filter((config) => {
        // @ts-ignore
        return config.survey_name === params.survey_name;
    });

    if (filteredConfigs.length === 0) {
        return (
            <div className='box-border w-screen h-screen centering-col lg:pl-104 xl:pl-124 2xl:pl-144'>
                <div className='text-lg text-gray-900 font-weight-700'>
                    404: Nothing here
                </div>
            </div>
        );
    }

    return (
        <Editor
            account={props.account}
            authToken={props.authToken}
            configs={props.configs}
            centralConfig={filteredConfigs[0]}
            setCentralConfig={props.setCentralConfig}
            configIsDiffering={props.configIsDiffering}
            markDiffering={props.markDiffering}
            openMessage={props.openMessage}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    authToken: state.authToken,
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    markDiffering: reduxUtils.dispatchers.markDiffering(dispatch),
    setCentralConfig: reduxUtils.dispatchers.setCentralConfig(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorRouter);
