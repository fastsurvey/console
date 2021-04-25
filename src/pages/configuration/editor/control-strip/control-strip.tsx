import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from 'utilities';
import {types} from 'types';
import VisualDraftStrip from './visual-draft-strip';
import VisualPublishedStrip from './visual-published-strip';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    setConfig(config: types.SurveyConfig): void;
    configIsDiffering: boolean;
    saveState(): void;
    publishState(): void;
    revertState(): void;
    openMessage(message: types.Message): void;
}
function ControlStrip(props: Props) {
    function now() {
        return Math.floor(Date.now() / 1000);
    }

    function startNow() {
        // TODO: Push new start timestamp to server
        props.setConfig({
            ...props.config,
            start: now(),
        });
    }

    function reopenNow() {
        // TODO: Push new start timestamp to server
        props.setConfig({
            ...props.config,
            start: now(),
            end: now() + 3600 * 24,
        });
    }

    function endNow() {
        // TODO: Push new end timestamp to server
        props.setConfig({
            ...props.config,
            end: Math.floor(Date.now() / 1000),
        });
    }

    function editNow() {
        // TODO: Push new end timestamp to server
        props.setConfig({
            ...props.config,
            draft: true,
        });
    }

    if (props.config.draft) {
        return (
            <VisualDraftStrip
                configIsDiffering={props.configIsDiffering}
                saveState={props.saveState}
                revertState={props.revertState}
                publishState={props.publishState}
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
