import {configTypes} from 'utilities';

const addLocalIds = {
    surveys: (configs: configTypes.SurveyConfig[]) =>
        configs.map((config: configTypes.SurveyConfig, i: number) =>
            addLocalIds.survey(config, i),
        ),
    survey: (config: configTypes.SurveyConfig, configId: number) => ({
        ...config,
        local_id: configId,
        fields: config.fields.map((field, index) =>
            addLocalIds.field(field, 1000 * config.local_id + index),
        ),
    }),
    field: (field: configTypes.SurveyField, fieldId: number) => {
        field.local_id = fieldId;
        if (field.type === 'radio' || field.type === 'selection') {
            field.fields = field.fields.map(
                (
                    fieldOption: configTypes.FieldOption,
                    subSubIndex: number,
                ) => ({
                    ...fieldOption,
                    local_id: 1000 * field.local_id + subSubIndex,
                }),
            );
        }
        return field;
    },
};

export default addLocalIds;
