import {types} from '/src/types';
import {validators} from './validators';

export function validateField(fieldConfig: types.SurveyField): types.ValidationResult {
    const results: types.ValidationResult[] = [
        validators.fieldTitle(fieldConfig.title),
        validators.description(fieldConfig.description),
    ];

    switch (fieldConfig.type) {
        case 'email':
            results.push(
                validators.hint(fieldConfig.hint),
                validators.regex(fieldConfig.regex),
            );
            break;
        case 'selection':
            results.push(
                ...fieldConfig.options.map((c) => validators.optionTitle(c.title)),
                validators.fieldOptions(fieldConfig),
                validators.minSelect(fieldConfig),
                validators.maxSelect(fieldConfig),
            );
            break;
        case 'text':
            results.push(
                validators.minChars(fieldConfig),
                validators.maxChars(fieldConfig.max_chars),
            );
            break;
    }

    // @ts-ignore
    return [...results.filter((r) => !r.valid), {valid: true}][0];
}
