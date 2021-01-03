import {configTypes} from 'utilities';

const surveyTemplate = (
    adminName: string,
    surveyName: string,
    configs: configTypes.SurveyConfig[],
): configTypes.SurveyConfig => {
    const now = Math.floor(Date.now() / 1000);
    return {
        local_id: configs.length,
        admin_name: adminName,
        survey_name: surveyName,
        start: now,
        end: now + 3600 * 24,
        mode: 0,
        draft: true,
        submission_limit: 100,
        title: '',
        description: '',
        fields: [],
    };
};

export default surveyTemplate;
