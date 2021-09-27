import {localIdUtils} from '@utilities';
import {types} from '@types';
import {max} from 'lodash';

export const field = (
    fieldType: types.FieldType,
    config: types.SurveyConfig,
): types.SurveyField => {
    const maxBackendId: number = config.max_identifier;
    const maxFieldId: any =
        config.fields.length > 0
            ? max(config.fields.map((f) => f.identifier))
            : -1;

    const commonAttributes: {
        identifier: number;
        local_id: number;
        title: string;
        description: '';
    } = {
        identifier: max([maxBackendId, maxFieldId]) + 1,
        local_id: localIdUtils.newId.field(config),
        title: '',
        description: '',
    };

    switch (fieldType) {
        case 'email':
            return {
                ...{
                    type: 'email',
                    regex: '.*',
                    verify: false,
                    hint: 'Any email address',
                },
                ...commonAttributes,
            };
        case 'option':
            return {
                ...{
                    type: 'option',
                    required: false,
                },
                ...commonAttributes,
            };
        case 'radio':
            return {
                ...{
                    type: 'radio',
                    options: [],
                },
                ...commonAttributes,
            };
        case 'selection':
            return {
                ...{
                    type: 'selection',
                    min_select: 0,
                    max_select: 0,
                    options: [],
                },
                ...commonAttributes,
            };
        case 'text':
            return {
                ...{
                    type: 'text',
                    min_chars: 0,
                    max_chars: 2000,
                },
                ...commonAttributes,
            };
    }
};
