import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from '/src/utilities';
import {types} from '/src/types';
import {icons} from '/src/assets';
import VisualEditorHeader from './visual-editor-header';

function now() {
    return Math.floor(Date.now() / 1000);
}

function EditorHeader(props: {
    configIsDiffering: boolean;
    account: types.Account;

    localConfig: types.SurveyConfig;
    saveState(configChanges?: object): void;
    revertState(): void;
    openMessage(messageId: types.MessageId): void;
}) {
    const {start, end} = props.localConfig;

    function startNow() {
        props.saveState({
            start: now() - 1,
            end: null,
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

    const saveButtons = [
        {
            icon: icons.closeCircle,
            text: 'undo',
            onClick: () => props.revertState(),
            'data-cy': 'button-undo',
            disabled: !props.configIsDiffering,
        },
        {
            icon: icons.checkCircle,
            text: 'save',
            onClick: () => props.saveState(),
            'data-cy': 'button-save',
            disabled: !props.configIsDiffering,
        },
    ];

    let timeButton;
    if (start === null || now() < start) {
        timeButton = {
            icon: icons.play,
            text: 'start now',
            onClick: startNow,
            'data-cy': 'button-start',
        };
    } else {
        if (start <= now() && (end === null || end > now())) {
            timeButton = {
                icon: icons.pause,
                text: 'end now',
                onClick: endNow,
                'data-cy': 'button-end',
            };
        } else {
            timeButton = {
                icon: icons.play,
                text: 'reopen now',
                onClick: reopenNow,
                'data-cy': 'button-reopen',
            };
        }
    }

    return <VisualEditorHeader {...props} {...{saveButtons, timeButton}} />;
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader);
