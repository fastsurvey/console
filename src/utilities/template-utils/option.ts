import {types} from '/src/types';
import localIdUtils from '../local-id-utils';

export const option = (
    newTitle: string,
    fieldConfig: types.SelectionField,
): types.SelectionField => {
    return {
        ...fieldConfig,
        options: [
            ...fieldConfig.options,
            {
                local_id: localIdUtils.newId.fieldOption(fieldConfig),
                title: newTitle,
            },
        ],
    };
};
