import {types} from '/src/types';
import {validators} from './validators';

export function validateSettings(
    configs: types.SurveyConfig[],
    thisConfig: types.SurveyConfig,
): types.ValidationResult {
    const results: types.ValidationResult[] = [
        validators.surveyTitle(thisConfig.title),
        validators.newSurveyName(configs, thisConfig),
        validators.timing(thisConfig),
    ];

    // @ts-ignore
    return [...results.filter((r) => !r.valid), {valid: true}][0];
}
