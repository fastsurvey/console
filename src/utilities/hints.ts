import {validators, configTypes} from 'utilities';

const hints = {
    title: (title: string) => ({
        text: `Not empty, max. 120 characters (${120 - title.length} left)`,
        fulfilled: validators.title(title),
    }),
    surveyName: (
        config: configTypes.SurveyConfig,
        surveyNameIsValid: (survey_name: string) => boolean,
    ) => ({
        text:
            'URL-safe, unique, 3-120 ' +
            `characters (${120 - config.survey_name.length} left)`,
        fulfilled: surveyNameIsValid(config.survey_name),
    }),
    submissionLimit: (config: configTypes.SurveyConfig) => ({
        text: '1 - 10.000',
        fulfilled: validators.submissionLimit(config.submission_limit),
    }),
};

export default hints;
