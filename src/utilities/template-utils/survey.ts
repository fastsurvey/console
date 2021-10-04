import {max} from 'lodash';
import {types} from '@types';
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
                type: 'option',
                title: 'Data Privacy',
                description: 'I accept the terms and conditions',
                required: true,
            },
        ],
    };
};

export default survey;
