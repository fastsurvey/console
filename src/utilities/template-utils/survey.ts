import {types} from '/src/types';
import surveyName from './survey-name';
import {max} from 'lodash';

export const survey = (configs: types.SurveyConfig[]): types.SurveyConfig => {
    const now = Math.floor(Date.now() / 1000);
    const newSurveyName: string = surveyName(configs);
    const newLocalId: any =
        configs.length > 0 ? max(configs.map((c) => c.local_id)) : 0;
    return {
        local_id: newLocalId,
        next_identifier: 0,
        survey_name: newSurveyName,
        start: now,
        end: now + 3600 * 24,
        title: 'We need more surveys!',
        fields: [],
    };
};

export default survey;
