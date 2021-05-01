import {types} from 'types';

export const survey = (
    surveyName: string,
    newLocalId: number,
): types.SurveyConfig => {
    const now = Math.floor(Date.now() / 1000);
    return {
        local_id: newLocalId,
        survey_name: surveyName,
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
