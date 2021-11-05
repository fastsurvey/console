import React from 'react';
import icons from '/src/assets/icons/icons';
import ControlStripUI from './visual-strip';
import ControlStripButton from './visual-button';

interface Props {
    configIsDiffering: boolean;
    saveState(): void;
    revertState(): void;
    publishNow(): void;
}
const VisualDraftStrip = (props: Props) => (
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
                onClick={props.saveState}
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
