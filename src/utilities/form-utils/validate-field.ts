import {types} from '/src/types';
import {validators} from './validators';

export function validateField(fieldConfig: types.SurveyField): types.ValidationResult {
    const results: types.ValidationResult[] = [];

    switch (fieldConfig.type) {
        case 'email':
            results.push(
                validators.hint(fieldConfig.hint),
                validators.regex(fieldConfig.regex),
                validators.description(fieldConfig.description),
            );
            break;
        case 'selection':
            results.push(
                ...fieldConfig.options.map((c) => validators.optionTitle(c.title)),
                validators.fieldOptions(fieldConfig),
                validators.minSelect(fieldConfig),
                validators.maxSelect(fieldConfig),
                validators.description(fieldConfig.description),
            );
            break;
        case 'text':
            results.push(
                validators.minChars(fieldConfig),
                validators.maxChars(fieldConfig.max_chars),
                validators.description(fieldConfig.description),
            );
            break;
        case 'break':
            break;
        case 'markdown':
            results.push(validators.description(fieldConfig.description));
            break;
        default:
            throw `Invalid field config: ${fieldConfig}`;
    }

    // @ts-ignore
    return [...results.filter((r) => !r.valid), {valid: true}][0];
}
