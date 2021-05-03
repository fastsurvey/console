import {types} from 'types';

function surveys(configs: types.SurveyConfig[]) {
    return configs.map((config: types.SurveyConfig, i: number) =>
        initialize.survey(config, i),
    );
}

function survey(config: types.SurveyConfig, configId: number) {
    return {
        ...config,
        local_id: configId,
        fields: config.fields.map((field, index) =>
            initialize.field(field, 1000 * configId + index),
        ),
    };
}

function field(field: types.SurveyField, fieldId: number) {
    field.local_id = fieldId;
    if (field.type === 'radio' || field.type === 'selection') {
        field.fields = field.fields.map(
            (fieldOption: types.FieldOption, subSubIndex: number) => ({
                ...fieldOption,
                local_id: 1000 * fieldId + subSubIndex,
            }),
        );
    }
    return field;
}

export const initialize = {
    surveys,
    survey,
    field,
};

export default initialize;
