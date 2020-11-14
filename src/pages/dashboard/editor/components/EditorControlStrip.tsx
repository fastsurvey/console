import React from 'react';
import {ReduxState, SurveyConfig} from '../../../../utilities/types';
import {ICONS} from '../../../../assets/icons/icons';
import {connect} from 'react-redux';

interface ControlStripButtonProps {
    label: string;
    icon: React.ReactNode;
    first?: boolean;
    last?: boolean;
    disabled?: boolean;
    onClick?(): void;
}

function ControlStripButton(props: ControlStripButtonProps) {
    return (
        <div
            onClick={() => {
                if (!props.disabled && props.onClick !== undefined) {
                    props.onClick();
                }
            }}
            className={
                'py-1 px-2 h-10 flex flex-row items-center justify-center ' +
                (props.disabled
                    ? 'cursor-not-allowed bg-gray-200 '
                    : 'cursor-pointer bg-white hover:text-blue-600 ') +
                (props.first ? 'rounded-l ' : '') +
                (props.last ? 'rounded-r ' : '') +
                (!props.first ? 'border-l ' : '') +
                (!props.last ? 'border-r ' : '')
            }
        >
            <div className={'h-8 w-8 p-1'}>{props.icon}</div>
            <div className={'text-lg font-weight-600 mr-2'}>{props.label}</div>
        </div>
    );
}
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
