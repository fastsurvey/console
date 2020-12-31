import {configTypes, validators} from 'utilities';

function validateField(fieldConfig: configTypes.SurveyField) {
    if (
        !validators.title(fieldConfig.title) ||
        !validators.description(fieldConfig.description)
    ) {
        return false;
    }

    switch (fieldConfig.type) {
        case 'Email':
            return (
                validators.hint(fieldConfig.hint) &&
                validators.regex(fieldConfig.regex)
            );
        case 'Option':
            return true;
        case 'Radio':
            return fieldConfig.fields.every((optionField) =>
                validators.title(optionField.title),
            );
        case 'Selection':
            return (
                fieldConfig.fields.every((optionField) =>
                    validators.title(optionField.title),
                ) &&
                validators.minSelect(fieldConfig) &&
                validators.maxSelect(fieldConfig)
            );
        case 'Text':
            return (
                validators.minChars(fieldConfig)(fieldConfig.min_chars) &&
                validators.maxChars(fieldConfig.max_chars)
            );
    }
}

export default validateField;
