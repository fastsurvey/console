import {types} from '@types';

const genericTitle =
    (variant: 'Title' | 'Field title' | 'Option name') =>
    (title: string): types.ValidationResult => {
        if (title.length === 0) {
            return {
                valid: false,
                message: `${variant} too short (> 0 characters)`,
            };
        } else if (title.length > 120) {
            return {
                valid: false,
                message:
                    `${variant} too long (≤ 120 characters, ` +
                    `currently: ${title.length})`,
            };
        } else {
            return {valid: true};
        }
    };

export const validators = {
    fieldOptions: (
        fieldConfig: types.RadioField | types.SelectionField,
    ): types.ValidationResult => {
        if (fieldConfig.fields.length < 2) {
            return {
                valid: false,
                message: `There have to be at least 2 options`,
            };
        } else {
            return {valid: true};
        }
    },

    authMode: (config: types.SurveyConfig): types.ValidationResult => {
        if (
            config.fields.filter((f) => f.type === 'email' && f.verify)
                .length <= 1
        ) {
            return {
                valid: false,
                message: `Email authentication requires exactaly one email field`,
            };
        } else {
            return {valid: true};
        }
    },

    timing: (config: types.SurveyConfig): types.ValidationResult => {
        if (config.start > config.end) {
            return {
                valid: false,
                message: `Start time has to be before end time`,
            };
        } else {
            return {valid: true};
        }
    },

    title: genericTitle('Title'),
    fieldTitle: genericTitle('Field title'),
    optionTitle: genericTitle('Option name'),

    surveyName: (
        configs: types.SurveyConfig[] | undefined,
        thisConfig: types.SurveyConfig,
    ): types.ValidationResult => {
        if (!thisConfig.survey_name.match(/^[a-zA-Z0-9-_]*$/)) {
            return {
                valid: false,
                message:
                    `URL conform identifier can only include letters, ` +
                    `numbers and '-' signs`,
            };
        } else if (thisConfig.survey_name.length < 3) {
            return {
                valid: false,
                message: `URL conform identifier too short (≥ 3 characters)`,
            };
        } else if (thisConfig.survey_name.length > 120) {
            return {
                valid: false,
                message:
                    `Description too long (≤ 120 characters, ` +
                    `currently: ${thisConfig.survey_name.length})`,
            };
        } else if (
            configs?.filter(
                (c) =>
                    c.local_id !== thisConfig.local_id &&
                    c.survey_name === thisConfig.survey_name,
            ).length !== 0
        ) {
            return {
                valid: false,
                message:
                    `URL conform identifier has to be unique, you ` +
                    `already have survey '${thisConfig.survey_name}'`,
            };
        } else {
            return {valid: true};
        }
    },

    newSurveyName:
        (configs: types.SurveyConfig[] | undefined) => (survey_name: string) =>
            survey_name.match(/^[a-zA-Z0-9-_]*$/) !== null &&
            3 <= survey_name.length &&
            survey_name.length <= 120 &&
            configs?.filter((config) => config.survey_name === survey_name)
                .length === 0,

    description: (description: string): types.ValidationResult => {
        if (description.length > 2000) {
            return {
                valid: false,
                message:
                    `Description too long (≤ 2000 characters, ` +
                    `currently: ${description.length})`,
            };
        } else {
            return {valid: true};
        }
    },

    submissionLimit: (submission_limit: number): types.ValidationResult => {
        if (submission_limit < 0) {
            return {
                valid: false,
                message: `Submission limit is negative`,
            };
        } else if (submission_limit > 100) {
            return {
                valid: false,
                message: `Submission limit is currently limited to 100 submissions`,
            };
        } else {
            return {valid: true};
        }
    },

    regex: (regex: string): types.ValidationResult => {
        if (regex.length > 250) {
            return {
                valid: false,
                message:
                    `Hint too long (≤ 250 characters, ` +
                    `currently: ${regex.length})`,
            };
        } else {
            return {valid: true};
        }
    },
    hint: (hint: string): types.ValidationResult => {
        if (hint.length > 120) {
            return {
                valid: false,
                message:
                    `Hint too long (≤ 120 characters, ` +
                    `currently: ${hint.length})`,
            };
        } else {
            return {valid: true};
        }
    },

    minChars: (fieldConfig: types.TextField): types.ValidationResult => {
        if (fieldConfig.min_chars < 0) {
            return {
                valid: false,
                message: `Minimum is negative`,
            };
        } else if (fieldConfig.min_chars > fieldConfig.max_chars) {
            return {
                valid: false,
                message: `Minimum has to be less than maximum`,
            };
        } else {
            return {valid: true};
        }
    },
    maxChars: (max_chars: number): types.ValidationResult => {
        if (max_chars > 2000) {
            return {
                valid: false,
                message: `Maximum has to be no more than 2000 characters`,
            };
        } else {
            return {valid: true};
        }
    },

    minSelect: (fieldConfig: types.SelectionField): types.ValidationResult => {
        if (fieldConfig.min_select < 0) {
            return {
                valid: false,
                message: `Minimum is negative`,
            };
        } else if (fieldConfig.min_select > fieldConfig.max_select) {
            return {
                valid: false,
                message: `Minimum has to be less than maximum`,
            };
        } else {
            return {valid: true};
        }
    },
    maxSelect: (fieldConfig: types.SelectionField): types.ValidationResult => {
        if (fieldConfig.max_select > fieldConfig.fields.length) {
            return {
                valid: false,
                message: `Maximum is larger than the number of fields`,
            };
        } else {
            return {valid: true};
        }
    },
};
