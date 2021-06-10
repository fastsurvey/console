import React from 'react';
import {types} from 'types';
import icons from 'assets/icons/icons';
import {connect} from 'react-redux';
import VisualEditorHeader from './visual-editor-header';

function EditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    setLocalConfig(configChanges: object): void;

    saveState(configChanges?: object): void;
    revertState(): void;
}) {
    const {draft, end} = props.localConfig;

    function now() {
        return Math.floor(Date.now() / 1000);
    }

    function startNow() {
        props.saveState({
            start: now(),
        });
    }

    function reopenNow() {
        props.saveState({
            start: now(),
            end: now() + 3600 * 24,
        });
    }

    function endNow() {
        props.saveState({
            end: Math.floor(Date.now() / 1000),
        });
    }

    const buttons = draft
        ? [
              {
                  icon: icons.closeCirlce,
                  text: 'undo',
                  onClick: props.revertState,
              },
              {
                  icon: icons.checkCircle,
                  text: 'save',
                  onClick: props.saveState,
              },
          ]
        : [
              {
                  icon: icons.play,
                  text: now() < end ? 'start now' : 'reopen now',
                  onClick: now() < end ? startNow : reopenNow,
              },
              {
                  icon: icons.pause,
                  text: 'end now',
                  onClick: endNow,
              },
          ];

    return <VisualEditorHeader {...props} {...{buttons}} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader);
