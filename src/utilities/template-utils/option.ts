import {types} from '/src/types';
import {helperUtils, localIdUtils} from '/src/utilities';

export const option = (
    newIndex: number,
    fieldConfig: types.SelectionField,
): types.SelectionField => {
    return {
        ...fieldConfig,
        options: helperUtils.insertIntoArray(fieldConfig.options, newIndex, {
            local_id: localIdUtils.newId.fieldOption(fieldConfig),
            title: '',
        }),
    };
};
