import React from 'react';
import {connect} from 'react-redux';

import configTypes from 'utilities/types/configTypes';
import stateTypes from 'utilities/types/stateTypes';
import dispatcher from 'utilities/dispatcher';

import ControlStripButton from './ControlStripButton';

import icons from 'assets/icons/icons';

interface EditorControlStripProps {
    config: configTypes.SurveyConfig;
    setConfig(config: configTypes.SurveyConfig): void;
    configIsDiffering: boolean;
    syncState(): void;
    revertState(): void;
    openMessage(message: stateTypes.Message): void;
}

function EditorControlStrip(props: EditorControlStripProps) {
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
                            icon={icons.launch}
                            onClick={() =>
                                window.open(
                                    `https://fastsurvey.io/${props.config.admin_name}` +
                                        `/${props.config.survey_name}`,
                                    '_blank',
                                )
                            }
                        />
                        <ControlStripButton
                            disabled={
                                props.config.start <= now() &&
                                now() < props.config.end
                            }
                            label={
                                now() < props.config.end
                                    ? 'Start Now'
                                    : 'Reopen Now'
                            }
                            icon={icons.play}
                            onClick={
                                now() < props.config.end ? startNow : reopenNow
                            }
                        />
                        <ControlStripButton
                            disabled={
                                now() >= props.config.end ||
                                now() < props.config.start
                            }
                            label='End Now'
                            icon={icons.stop}
                            onClick={endNow}
                        />
                        <ControlStripButton
                            last
                            label='Edit'
                            icon={icons.create}
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
                            icon={icons.undo}
                            onClick={props.revertState}
                        />
                        <ControlStripButton
                            disabled={!props.configIsDiffering}
                            label='Save'
                            icon={icons.save}
                            onClick={props.syncState}
                        />
                        <ControlStripButton
                            last
                            label='Publish'
                            icon={icons.open_in_browser}
                            onClick={publishNow}
                        />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatcher.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorControlStrip);
