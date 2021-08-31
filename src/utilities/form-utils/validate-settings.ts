import {types} from '@types';
import {validators} from './validators';

export function validateSettings(
    configs: types.SurveyConfig[],
    thisConfig: types.SurveyConfig,
): types.ValidationResult {
    const results: types.ValidationResult[] = [
        validators.title(thisConfig.title),
        validators.surveyName(configs, thisConfig),
        validators.description(thisConfig.description),
        validators.timing(thisConfig),
    ];

    // @ts-ignore
    return [...results.filter((r) => !r.valid), {valid: true}][0];
}
