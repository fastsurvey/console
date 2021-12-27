import {types} from '/src/types';
import {validators} from './validators';
import {filter, first} from 'lodash';

export function validateField(fieldConfig: types.SurveyField): types.ValidationResult {
    const results: types.ValidationResult[] = [];

    switch (fieldConfig.type) {
        case 'email':
            results.push(
                validators.hint(fieldConfig.hint),
                validators.regex(fieldConfig.regex),
                validators.fieldDescription(fieldConfig.description),
            );
            break;
        case 'selection':
            results.push(
                ...fieldConfig.options.map((c) => validators.optionTitle(c.title)),
                validators.fieldOptions(fieldConfig),
                validators.minSelect(fieldConfig),
                validators.maxSelect(fieldConfig),
                validators.fieldDescription(fieldConfig.description),
            );
            break;
        case 'text':
            results.push(
                validators.minChars(fieldConfig),
                validators.maxChars(fieldConfig.max_chars),
                validators.fieldDescription(fieldConfig.description),
            );
            break;
        case 'break':
            break;
        case 'markdown':
            results.push(validators.fieldDescription(fieldConfig.description));
            break;
        default:
            throw `Invalid field config: ${fieldConfig}`;
    }

    return first(filter(results, {valid: false})) || {valid: true};
}
