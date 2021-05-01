import {types} from 'types';
import localIdUtils from '../local-id-utils/index';

export const option = (
    newTitle: string,
    fieldConfig: types.RadioField | types.SelectionField,
): types.RadioField | types.SelectionField => {
    return {
        ...fieldConfig,
        fields: [
            ...fieldConfig.fields,
            {
                type: 'option',
                local_id: localIdUtils.newId.fieldOption(fieldConfig),
                title: newTitle,
                description: '',
                required: false,
            },
        ],
    };
};
