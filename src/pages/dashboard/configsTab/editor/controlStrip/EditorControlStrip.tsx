import React from 'react';
import {ReduxState, SurveyConfig} from '../../../../../utilities/types';
import {ICONS} from '../../../../../assets/icons/icons';
import {connect} from 'react-redux';
import ControlStripButton from './ControlStripButton';

interface EditorControlStripProps {
    config: SurveyConfig;
    setConfig(config: SurveyConfig): void;
    configIsDiffering: boolean;
    syncState(): void;
    revertState(): void;
}

function EditorControlStrip(props: EditorControlStripProps) {
    function startNow() {
        props.setConfig({
            ...props.config,
            ...{start: Math.floor(Date.now() / 1000)},
        });
    }

    function endNow() {
        props.setConfig({
            ...props.config,
            ...{end: Math.floor(Date.now() / 1000)},
        });
    }

    return (
        <div
            id='ControlStrip'
            className={
                'z-50 fixed center-content p-4 border-b-4 border-gray-500 bg-gray-300'
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
                            label='Draft'
                            icon={ICONS.create}
                        />
                    </React.Fragment>
                )}
                {props.config.draft && (
                    <React.Fragment>
                        <ControlStripButton
                            first
                            label='Publish'
                            icon={ICONS.open_in_browser}
                        />
                        <ControlStripButton
                            disabled={!props.configIsDiffering}
                            label='Revert'
                            icon={ICONS.undo}
                            onClick={props.revertState}
                        />
                        <ControlStripButton
                            last
                            disabled={!props.configIsDiffering}
                            label='Save'
                            icon={ICONS.save}
                            onClick={props.syncState}
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
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EditorControlStrip);
