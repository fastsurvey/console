import React from 'react';
import {SurveyConfig} from '../../../../utilities/types';
import {ICONS} from '../../../../assets/icons/icons';

interface ControlStripButtonProps {
    label: string;
    icon: React.ReactNode;
    first?: boolean;
    last?: boolean;
}

function ControlStripButton(props: ControlStripButtonProps) {
    return (
        <div
            className={
                'py-1 px-2 h-10 flex flex-row items-center justify-center ' +
                'cursor-pointer bg-white hover:text-blue-600 ' +
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
}

function EditorControlStrip(props: EditorControlStripProps) {
    return (
        <div className={'fixed h-10 flex flex-row items-center shadow rounded'}>
            <ControlStripButton first label='Start Now' icon={ICONS.play} />
            <ControlStripButton label='End Now' icon={ICONS.stop} />
            <ControlStripButton
                last
                label='Save Configuration'
                icon={ICONS.save}
            />
        </div>
    );
}

export default EditorControlStrip;
