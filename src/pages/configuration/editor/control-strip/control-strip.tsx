import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from '/src/utilities';
import {types} from '/src/types';
import VisualDraftStrip from './visual-draft-strip';
import VisualPublishedStrip from './visual-published-strip';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    setCentralConfig(configChanges: object): void;
    configIsDiffering: boolean;
    saveState(): void;
    revertState(): void;
    openMessage(messageId: types.MessageId): void;
}
function ControlStrip(props: Props) {
    function now() {
        return Math.floor(Date.now() / 1000);
    }

    function startNow() {
        props.setCentralConfig({
            start: now(),
        });
    }

    function reopenNow() {
        props.setCentralConfig({
            start: now(),
            end: now() + 3600 * 24,
        });
    }

    function endNow() {
        props.setCentralConfig({
            end: Math.floor(Date.now() / 1000),
        });
    }

    function editNow() {
        props.setCentralConfig({
            draft: true,
        });
    }

    function publishNow() {
        props.setCentralConfig({
            draft: false,
        });
    }

    if (props.config.draft) {
        return (
            <VisualDraftStrip
                configIsDiffering={props.configIsDiffering}
                saveState={props.saveState}
                revertState={props.revertState}
                publishNow={publishNow}
            />
        );
    } else {
        return (
            <VisualPublishedStrip
                now={now}
                account={props.account}
                config={props.config}
                startNow={startNow}
                reopenNow={reopenNow}
                endNow={endNow}
                editNow={editNow}
            />
        );
    }
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlStrip);
