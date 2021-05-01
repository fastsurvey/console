import {types} from 'types';
import {max} from 'lodash';

function fieldOption(
    fieldConfig: types.RadioField | types.SelectionField,
): number {
    const local_id: number | undefined = max(
        fieldConfig.fields.map(
            (optionConfig: types.FieldOption) => optionConfig.local_id,
        ),
    );

    if (local_id) {
        return local_id + 1;
    } else {
        return fieldConfig.local_id;
    }
}

function field(config: types.SurveyConfig): number {
    const maxId = max(
        config.fields.map((field: types.SurveyField) => field.local_id),
    );
    if (maxId) {
        return maxId + 1;
    } else {
        return config.local_id * 1000;
    }
}

export const add = {
    fieldOption,
    field,
};
