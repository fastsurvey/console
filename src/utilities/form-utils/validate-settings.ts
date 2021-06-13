import {validators} from './validators';
import {types} from 'types';

export function validateSettings(
    configs: types.SurveyConfig[],
    thisConfig: types.SurveyConfig,
): types.ValidationResult {
    const results: types.ValidationResult[] = [
        validators.title(thisConfig.title),
        validators.surveyName(configs, thisConfig),
        validators.description(thisConfig.description),
        validators.timing(thisConfig),
        validators.submissionLimit(thisConfig.limit),
    ];

    // @ts-ignore
    return [...results.filter((r) => !r.valid), {valid: true}][0];
}
