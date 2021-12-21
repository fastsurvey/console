import {localIdUtils} from '/src/utilities';
import {types} from '/src/types';
import {fieldIdentifier} from './field-identifier';

export const field = (
    fieldType: types.FieldType,
    config: types.SurveyConfig,
): types.SurveyField => {
    const newFieldIdentifier: number = fieldIdentifier(config);

    const idAttributes = {
        identifier: newFieldIdentifier,
        local_id: localIdUtils.newId.field(config),
    };

    switch (fieldType) {
        case 'email':
            return {
                type: 'email',
                description: '',
                regex: '.*',
                verify: false,
                hint: 'Any email address',
                ...idAttributes,
            };
        case 'selection':
            return {
                type: 'selection',
                description: '',
                min_select: 0,
                max_select: 0,
                options: [],
                ...idAttributes,
            };
        case 'text':
            return {
                type: 'text',
                description: '',
                min_chars: 0,
                max_chars: 2000,
                ...idAttributes,
            };
        case 'break':
            return {
                type: 'break',
                ...idAttributes,
            };
        case 'markdown':
            return {
                type: 'markdown',
                description: '',
                ...idAttributes,
            };
        default:
            throw `Invalid field type: ${fieldType}`;
    }
};
