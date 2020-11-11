import React from 'react';
import {SurveyConfig} from '../../../utilities/types';

interface ConfigPreviewPanelProps {
    config: SurveyConfig;
    index: number;
}

function ConfigPreviewPanel(props: ConfigPreviewPanelProps) {
    return (
        <div className='w-full p-2 my-2 bg-white rounded shadow'>
            <h5>{props.config.title}</h5>
            <p>{props.config.survey_name}</p>
        </div>
    );
}

export default ConfigPreviewPanel;
