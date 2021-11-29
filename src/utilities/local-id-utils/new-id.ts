import {types} from '/src/types';
import {max} from 'lodash';

function fieldOption(fieldConfig: types.SelectionField): number {
    const maxId = max(
        fieldConfig.options.map(
            (optionConfig: types.FieldOption) => optionConfig.local_id,
        ),
    );

    if (maxId !== undefined) {
        return maxId + 1;
    } else {
        return fieldConfig.local_id;
    }
}

function field(config: types.SurveyConfig): number {
    const maxId = max(config.fields.map((field: types.SurveyField) => field.local_id));
    if (maxId !== undefined) {
        return maxId + 1;
    } else {
        return config.local_id * 1000;
    }
}

export const newId = {
    fieldOption,
    field,
};
