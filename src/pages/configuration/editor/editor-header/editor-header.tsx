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

    let buttons = draft
        ? [
              {
                  icon: icons.closeCircle,
                  text: 'undo',
                  onClick: () => props.revertState(),
                  disabled: !props.configIsDiffering,
              },
              {
                  icon: icons.checkCircle,
                  text: 'save',
                  onClick: () => props.saveState(),
                  disabled: !props.configIsDiffering,
              },
          ]
        : [
              /*{
                  icon: icons.play,
                  text: now() < end ? 'start now' : 'reopen now',
                  onClick: now() < end ? startNow : reopenNow,
                  disabled: start < now() && now() < end,
              },
              {
                  icon: icons.pause,
                  text: 'end now',
                  onClick: endNow,
                  disabled: now() < start || end < now(),
              },*/
          ];

    return <VisualEditorHeader {...props} {...{buttons}} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader);
