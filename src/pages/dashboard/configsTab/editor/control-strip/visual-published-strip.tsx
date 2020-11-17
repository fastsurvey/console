import React from 'react';

import configTypes from 'utilities/types/configTypes';

import ControlStripUI from './visual-strip';
import ControlStripButton from './visual-button';

import icons from 'assets/icons/icons';

interface VisualPublishedStripProps {
    now(): number;
    config: configTypes.SurveyConfig;
    startNow(): void;
    reopenNow(): void;
    endNow(): void;
    editNow(): void;
}
const VisualPublishedStrip = (props: VisualPublishedStripProps) => (
    <ControlStripUI>
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
                props.config.start <= props.now() &&
                props.now() < props.config.end
            }
            label={props.now() < props.config.end ? 'Start Now' : 'Reopen Now'}
            icon={icons.play}
            onClick={
                props.now() < props.config.end
                    ? props.startNow
                    : props.reopenNow
            }
        />
        <ControlStripButton
            disabled={
                props.now() >= props.config.end ||
                props.now() < props.config.start
            }
            label='End Now'
            icon={icons.stop}
            onClick={props.endNow}
        />
        <ControlStripButton
            last
            label='Edit'
            icon={icons.create}
            onClick={props.editNow}
        />
    </ControlStripUI>
);

export default VisualPublishedStrip;
