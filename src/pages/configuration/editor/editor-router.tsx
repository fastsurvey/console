import React from 'react';
import {connect} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import {reduxUtils} from '@utilities';
import Editor from './editor';
import {types} from '@types';
import {Button} from '@components';

interface Props {
    account: types.Account;
    accessToken: types.AccessToken;

    configs: types.SurveyConfig[];
    setCentralConfig(config: types.SurveyConfig): void;
    openMessage(messageId: types.MessageId): void;
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
            <div className='box-border w-screen h-screen px-8 centering-col'>
                <div className='mb-2 text-lg text-gray-900 font-weight-600'>
                    404: Nothing here
                </div>

                <Link to='/configurations' className='rounded ringable'>
                    <Button
                        text='Back to survey list'
                        variant='flat-light-blue'
                    />
                </Link>
            </div>
        );
    }

    return (
        <Editor
            account={props.account}
            accessToken={props.accessToken}
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
    accessToken: state.accessToken,
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
