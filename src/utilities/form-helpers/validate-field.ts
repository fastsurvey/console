import {validators} from 'utilities';
import {types} from 'types';

function validateField(fieldConfig: types.SurveyField) {
    if (
        !validators.title(fieldConfig.title) ||
        !validators.description(fieldConfig.description)
    ) {
        return false;
    }

    switch (fieldConfig.type) {
        case 'email':
            return (
                validators.hint(fieldConfig.hint) &&
                validators.regex(fieldConfig.regex)
            );
        case 'option':
            return true;
        case 'radio':
            return fieldConfig.fields.every((optionField) =>
                validators.title(optionField.title),
            );
        case 'selection':
            return (
                fieldConfig.fields.every((optionField) =>
                    validators.title(optionField.title),
                ) &&
                validators.minSelect(fieldConfig) &&
                validators.maxSelect(fieldConfig)
            );
        case 'text':
            return (
                validators.minChars(fieldConfig)(fieldConfig.min_chars) &&
                validators.maxChars(fieldConfig.max_chars)
            );
    }
}

export default validateField;
