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
    regex: (fieldConfig: configTypes.EmailField) => ({
        text: `<= 250 Characters (${250 - fieldConfig.hint.length} left)`,
        fulfilled: validators.regex(fieldConfig.regex),
    }),
    hint: (fieldConfig: configTypes.EmailField) => ({
        text: `<= 120 Characters (${120 - fieldConfig.hint.length} left)`,
        fulfilled: validators.hint(fieldConfig.hint),
    }),
    minChars: (fieldConfig: configTypes.TextField) => ({
        text: '<= max char.',
        fulfilled: validators.minChars(fieldConfig)(fieldConfig.min_chars),
    }),
    maxChars: (fieldConfig: configTypes.TextField) => ({
        text: '<= 2000',
        fulfilled: validators.maxChars(fieldConfig.max_chars),
    }),
    newOption: (newOption: string) => ({
        text: 'Press <Enter> to add',
        fulfilled: newOption !== '',
        hideDot: true,
    }),
    minSelect: (fieldConfig: configTypes.SelectionField) => ({
        text: '<= max select.',
        fulfilled: validators.minSelect(fieldConfig),
    }),
    maxSelect: (fieldConfig: configTypes.SelectionField) => ({
        text: `<= ${fieldConfig.fields.length}`,
        fulfilled: validators.maxSelect(fieldConfig),
    }),
};

export default hints;
