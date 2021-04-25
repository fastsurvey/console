import {types} from 'types';

const surveyTemplate = (
    surveyName: string,
    configs: types.SurveyConfig[],
): types.SurveyConfig => {
    const now = Math.floor(Date.now() / 1000);
    return {
        local_id: configs.length,
        survey_name: surveyName,
        start: now,
        end: now + 3600 * 24,
        authentication: 'open',
        draft: true,
        limit: 100,
        title: '',
        description: '',
        fields: [],
    };
};

export default surveyTemplate;
