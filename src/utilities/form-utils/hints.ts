import {types} from '@types';
import {validators} from './validators';

export const hints = {
    title: (title: string) => ({
        text: `Not empty, max. 120 characters (${120 - title.length} left)`,
        fulfilled: validators.title(title),
    }),
    surveyName: (
        config: types.SurveyConfig,
        surveyNameIsValid: (survey_name: string) => boolean,
    ) => ({
        text:
            'URL-safe, unique, 3-120 ' +
            `characters (${120 - config.survey_name.length} left)`,
        fulfilled: surveyNameIsValid(config.survey_name),
    }),
    newSurveyName: (
        newSurveyName: string,
        surveyNameIsValid: (survey_name: string) => boolean,
    ) => ({
        text:
            'URL-safe, unique, 3-120 ' +
            `characters (${120 - newSurveyName.length} left)`,
        fulfilled: surveyNameIsValid(newSurveyName),
    }),
    regex: (fieldConfig: types.EmailField) => ({
        text: `<= 250 Characters (${250 - fieldConfig.hint.length} left)`,
        fulfilled: validators.regex(fieldConfig.regex),
    }),
    hint: (fieldConfig: types.EmailField) => ({
        text: `<= 120 Characters (${120 - fieldConfig.hint.length} left)`,
        fulfilled: validators.hint(fieldConfig.hint),
    }),
    minChars: (fieldConfig: types.TextField) => ({
        text: '<= max char.',
        fulfilled: validators.minChars(fieldConfig).valid,
    }),
    maxChars: (fieldConfig: types.TextField) => ({
        text: '<= 2000',
        fulfilled: validators.maxChars(fieldConfig.max_chars),
    }),
    newOption: (newOption: string) => ({
        text: 'Press <Enter> to add',
        fulfilled: newOption !== '',
        hideDot: true,
    }),
    minSelect: (fieldConfig: types.SelectionField) => ({
        text: '<= max select.',
        fulfilled: validators.minSelect(fieldConfig),
    }),
    maxSelect: (fieldConfig: types.SelectionField) => ({
        text: `<= ${fieldConfig.fields.length}`,
        fulfilled: validators.maxSelect(fieldConfig),
    }),
    password: (password: string) => ({
        text: '> 7 characters',
        fulfilled: password.length > 7,
    }),
    username: (username: string) => ({
        text: '> 2 characters',
        fulfilled: username.length > 2,
    }),
    passwordConfirmation: (password: string, passwordConfirmation: string) => ({
        text: 'passwords match',
        fulfilled: password.length > 7 && password === passwordConfirmation,
    }),
};
