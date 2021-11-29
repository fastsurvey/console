import {types} from '/src/types';
import surveyName from './survey-name';

export const survey = (configs: types.SurveyConfig[]): any => {
    const now = Math.floor(Date.now() / 1000);
    const newSurveyName: string = surveyName(configs);
    return {
        survey_name: newSurveyName,
        start: now,
        end: now + 3600 * 24,
        draft: true,
        title: 'We need more surveys!',
        description: '',
        fields: [
            {
                identifier: 0,
                type: 'text',
                title: 'Do you think, potatoes are a good idea?',
                description: '',
                min_chars: 0,
                max_chars: 2000,
            },
        ],
    };
};

export default survey;
