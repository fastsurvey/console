import {types} from 'types';

const addLocalIds = {
    surveys: (configs: types.SurveyConfig[]) =>
        configs.map((config: types.SurveyConfig, i: number) =>
            addLocalIds.survey(config, i),
        ),
    survey: (config: types.SurveyConfig, configId: number) => ({
        ...config,
        local_id: configId,
        fields: config.fields.map((field, index) =>
            addLocalIds.field(field, 1000 * configId + index),
        ),
    }),
    field: (field: types.SurveyField, fieldId: number) => {
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
    },
};

export default addLocalIds;
