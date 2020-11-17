import React from 'react';

import ControlStripUI from './visual-strip';
import ControlStripButton from './visual-button';

import icons from 'assets/icons/icons';

interface VisualDraftStripProps {
    configIsDiffering: boolean;
    syncState(): void;
    revertState(): void;
    publishNow(): void;
}
const VisualDraftStrip = (props: VisualDraftStripProps) => (
    <ControlStripUI>
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
                onClick={props.publishNow}
            />
        </React.Fragment>
    </ControlStripUI>
);

export default VisualDraftStrip;
