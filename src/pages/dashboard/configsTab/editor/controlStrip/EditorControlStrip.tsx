import React from 'react';
import {
    Message,
    ReduxState,
    SurveyConfig,
} from '../../../../../utilities/types';
import {ICONS} from '../../../../../assets/icons/icons';
import {connect} from 'react-redux';
import ControlStripButton from './ControlStripButton';
import {openMessageAction} from '../../../../../utilities/reduxActions';

interface EditorControlStripProps {
    config: SurveyConfig;
    setConfig(config: SurveyConfig): void;
    configIsDiffering: boolean;
    syncState(): void;
    revertState(): void;
    openMessage(message: Message): void;
}

function EditorControlStrip(props: EditorControlStripProps) {
    function startNow() {
        // TODO: Push new start timestamp to server
        props.setConfig({
            ...props.config,
            start: Math.floor(Date.now() / 1000),
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

    return (
        <div
            id='ControlStrip'
            className={
                'z-50 fixed center-content p-4 border-b-4 border-gray-500 ' +
                'bg-gray-300 no-selection '
            }
        >
            <div
                className={
                    'relative w-auto flex flex-row items-center shadow rounded'
                }
            >
                {!props.config.draft && (
                    <React.Fragment>
                        <ControlStripButton
                            first
                            disabled={props.config.draft}
                            label='Open'
                            icon={ICONS.launch}
                            onClick={() =>
                                window.open(
                                    `https://fastsurvey.io/${props.config.admin_name}` +
                                        `/${props.config.survey_name}`,
                                    '_blank',
                                )
                            }
                        />
                        <ControlStripButton
                            disabled={props.config.draft}
                            label='Start Now'
                            icon={ICONS.play}
                            onClick={startNow}
                        />
                        <ControlStripButton
                            disabled={props.config.draft}
                            label='End Now'
                            icon={ICONS.stop}
                            onClick={endNow}
                        />
                        <ControlStripButton
                            last
                            label='Edit'
                            icon={ICONS.create}
                            onClick={editNow}
                        />
                    </React.Fragment>
                )}
                {props.config.draft && (
                    <React.Fragment>
                        <ControlStripButton
                            first
                            disabled={!props.configIsDiffering}
                            label='Undo'
                            icon={ICONS.undo}
                            onClick={props.revertState}
                        />
                        <ControlStripButton
                            disabled={!props.configIsDiffering}
                            label='Save'
                            icon={ICONS.save}
                            onClick={props.syncState}
                        />
                        <ControlStripButton
                            last
                            label='Publish'
                            icon={ICONS.open_in_browser}
                            onClick={publishNow}
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: (message: Message) => dispatch(openMessageAction(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorControlStrip);
