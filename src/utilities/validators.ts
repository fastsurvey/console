import {configTypes} from 'utilities';

const validators = {
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

    description: (description: string) =>
        0 <= description.length && description.length <= 2000,

    submissionLimit: (submission_limit: number) =>
        1 <= submission_limit && submission_limit <= 10000,

    regex: (regex: string) => regex.length <= 250,
    hint: (hint: string) => hint.length <= 120,
    minChars: (fieldConfig: configTypes.TextField) => (min_chars: number) =>
        0 <= min_chars && min_chars <= fieldConfig.max_chars,
    maxChars: (max_chars: number) => max_chars <= 2000,
};

export default validators;
