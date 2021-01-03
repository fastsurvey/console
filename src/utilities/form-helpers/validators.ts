import {configTypes} from 'utilities';

const validators = {
    fieldOptions: (config: configTypes.SurveyConfig) =>
        config.fields.filter(
            (fieldConfig: configTypes.SurveyField) =>
                (fieldConfig.type === 'Radio' ||
                    fieldConfig.type === 'Selection') &&
                fieldConfig.fields.length < 2,
        ).length === 0,

    authMode: (config: configTypes.SurveyConfig) =>
        config.mode !== 1 ||
        config.fields.filter((fieldConfig) => fieldConfig.type === 'Email')
            .length === 1,

    timing: (config: configTypes.SurveyConfig) => config.start <= config.end,

    title: (title: string) => 1 <= title.length && title.length <= 120,

    surveyName: (
        configs: configTypes.SurveyConfig[] | undefined,
        thisConfig: configTypes.SurveyConfig,
    ) => (survey_name: string) =>
        survey_name.match(/^[a-zA-Z0-9-_]*$/) !== null &&
        3 <= survey_name.length &&
        survey_name.length <= 120 &&
        configs?.filter(
            (config) =>
                config.local_id !== thisConfig.local_id &&
                config.survey_name === survey_name,
        ).length === 0,

    newSurveyName: (configs: configTypes.SurveyConfig[] | undefined) => (
        survey_name: string,
    ) =>
        survey_name.match(/^[a-zA-Z0-9-_]*$/) !== null &&
        3 <= survey_name.length &&
        survey_name.length <= 120 &&
        configs?.filter((config) => config.survey_name === survey_name)
            .length === 0,

    description: (description: string) =>
        0 <= description.length && description.length <= 2000,

    submissionLimit: (submission_limit: number) =>
        1 <= submission_limit && submission_limit <= 10000,

    regex: (regex: string) => regex.length <= 250,
    hint: (hint: string) => hint.length <= 120,
    minChars: (fieldConfig: configTypes.TextField) => (min_chars: number) =>
        0 <= min_chars && min_chars <= fieldConfig.max_chars,
    maxChars: (max_chars: number) => max_chars <= 2000,
    minSelect: (fieldConfig: configTypes.SelectionField) =>
        0 <= fieldConfig.min_select &&
        fieldConfig.min_select <= fieldConfig.max_select,
    maxSelect: (fieldConfig: configTypes.SelectionField) =>
        fieldConfig.max_select <= fieldConfig.fields.length,
};

export default validators;
