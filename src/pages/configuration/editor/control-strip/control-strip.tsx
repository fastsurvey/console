import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from 'utilities';
import {types} from 'types';
import VisualDraftStrip from './visual-draft-strip';
import VisualPublishedStrip from './visual-published-strip';

interface Props {
    account: types.Account;
    config: types.SurveyConfig;
    setConfig(config: object): void;
    differing: boolean;
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
        props.setConfig({
            start: now(),
        });
    }

    function reopenNow() {
        props.setConfig({
            start: now(),
            end: now() + 3600 * 24,
        });
    }

    function endNow() {
        props.setConfig({
            end: Math.floor(Date.now() / 1000),
        });
    }

    function editNow() {
        props.setConfig({
            draft: true,
        });
    }

    function publishNow() {
        props.setConfig({
            ...props.config,
            draft: false,
        });
    }

    if (props.config.draft) {
        return (
            <VisualDraftStrip
                configIsDiffering={props.differing}
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
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlStrip);
