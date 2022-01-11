import {localIdUtils} from '/src/utilities';
import {types} from '/src/types';
import {max} from 'lodash';

export const field = (
    fieldType: types.FieldType,
    config: types.SurveyConfig,
): types.SurveyField => {
    const identifier = fieldIdentifier(config);
    const local_id = localIdUtils.newId.field(config);

    switch (fieldType) {
        case 'email':
            return {
                type: 'email',
                description: '',
                regex: '.*',
                verify: false,
                hint: 'Any email address',
                identifier,
                local_id,
            };
        case 'selection':
            return {
                type: 'selection',
                description: '',
                min_select: 0,
                max_select: 0,
                options: [],
                identifier,
                local_id,
            };
        case 'text':
            return {
                type: 'text',
                description: '',
                min_chars: 0,
                max_chars: 2000,
                identifier,
                local_id,
            };
        case 'break':
            return {
                type: 'break',
                identifier,
                local_id,
            };
        case 'markdown':
            return {
                type: 'markdown',
                description: '',
                identifier,
                local_id,
            };
        default:
            throw `Invalid field type: ${fieldType}`;
    }
};

export const fieldIdentifier = (config: types.SurveyConfig): number => {
    // this is necessary in case the user adds fields, removes some and
    // adds new ones again, all without saving the config

    const nextBackendId: number = config.next_identifier;
    const maxLocalId: any = max(config.fields.map((f) => f.identifier));
    const nextLocalId = maxLocalId === undefined ? 0 : maxLocalId + 1;

    // @ts-ignore
    return max([nextBackendId, nextLocalId]);
};
