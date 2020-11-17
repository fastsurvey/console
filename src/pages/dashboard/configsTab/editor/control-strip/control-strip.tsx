import React from 'react';
import {connect} from 'react-redux';

import {stateTypes, configTypes, dispatcher} from 'utilities';

import VisualDraftStrip from './visual-draft-strip';
import VisualPublishedStrip from './visual-published-strip';

interface ControlStripProps {
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    configIsDiffering: boolean;
    syncState(): void;
    revertState(): void;
    openMessage(message: stateTypes.Message): void;
}
function ControlStrip(props: ControlStripProps) {
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

    function publishNow() {
        // TODO: Push new end timestamp to server
        if (props.configIsDiffering) {
            props.openMessage({
                text: 'Please save or undo your changes first!',
                type: 'warning',
            });
        } else {
            props.setConfig({
                ...props.config,
                draft: false,
            });
        }
    }

    if (props.config.draft) {
        return (
            <VisualDraftStrip
                configIsDiffering={props.configIsDiffering}
                syncState={props.syncState}
                revertState={props.revertState}
                publishNow={publishNow}
            />
        );
    } else {
        return (
            <VisualPublishedStrip
                now={now}
                config={props.config}
                startNow={startNow}
                reopenNow={reopenNow}
                endNow={endNow}
                editNow={editNow}
            />
        );
    }
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatcher.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ControlStrip);
