import {localIdUtils} from '/src/utilities';
import {types} from '/src/types';
import {fieldIdentifier} from './field-identifier';

export const field = (
    fieldType: types.FieldType,
    config: types.SurveyConfig,
): types.SurveyField => {
    const newFieldIdentifier: number = fieldIdentifier(config);

    const commonAttributes: {
        identifier: number;
        local_id: number;
        title: string;
        description: '';
    } = {
        identifier: newFieldIdentifier,
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
