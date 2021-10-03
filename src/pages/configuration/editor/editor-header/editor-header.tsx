import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from '@utilities';
import {types} from '@types';
import {icons} from '@assets';
import VisualEditorHeader from './visual-editor-header';

function EditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(configChanges?: object): void;
    revertState(): void;
    openMessage(messageId: types.MessageId): void;
}) {
    const {draft, start, end} = props.localConfig;

    function now() {
        return Math.floor(Date.now() / 1000);
    }

    function startNow() {
        props.saveState({
            start: now() - 1,
        });
    }

    function reopenNow() {
        props.saveState({
            start: now() - 1,
            end: now() + 3600 * 24 + 1,
        });
    }

    function endNow() {
        props.saveState({
            end: now() - 1,
        });
    }

    const saveButtons = props.configIsDiffering
        ? [
              {
                  icon: icons.closeCircle,
                  text: 'undo',
                  onClick: () => props.revertState(),
              },
              {
                  icon: icons.checkCircle,
                  text: 'save',
                  onClick: () => props.saveState(),
              },
          ]
        : [];

    const publishButton = {
        icon: icons.uploadCloud,
        text: 'publish',
        onClick: () => {
            props.saveState({
                draft: !draft,
            });
        },
    };

    let timeButton: any;
    if (start < now() && now() < end) {
        timeButton = {
            icon: icons.pause,
            text: 'end now',
            onClick: endNow,
        };
    } else if (now() < start) {
        timeButton = {
            icon: icons.play,
            text: 'start now',
            onClick: startNow,
        };
    } else {
        timeButton = {
            icon: icons.play,
            text: 'reopen now',
            onClick: reopenNow,
        };
    }

    return (
        <VisualEditorHeader
            {...props}
            {...{saveButtons, timeButton, publishButton}}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader);
