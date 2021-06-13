import {max} from 'lodash';
import {types} from 'types';
import surveyName from './survey-name';

export const survey = (configs: types.SurveyConfig[]): types.SurveyConfig => {
    const now = Math.floor(Date.now() / 1000);
    const newLocalId: any = max(configs.map((c) => c.local_id));
    const newSurveyName: string = surveyName(configs);
    return {
        local_id: newLocalId,
        survey_name: newSurveyName,
        start: now,
        end: now + 3600 * 24,
        authentication: 'open',
        draft: true,
        limit: 100,
        title: 'We need more surveys!',
        description: '',
        fields: [
            {
                type: 'option',
                local_id: newLocalId * 1000,
                title: 'Data Privacy',
                description: 'I accept the terms and conditions',
                required: true,
            },
        ],
    };
};

export default survey;
