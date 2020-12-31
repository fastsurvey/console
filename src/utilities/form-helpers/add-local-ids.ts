import {configTypes} from 'utilities';

const addLocalIds = {
    survey: (config: configTypes.SurveyConfig, configId: number) => {
        config.local_id = configId;
        config.fields.map((field, index) =>
            addLocalIds.field(field, 1000 * config.local_id + index),
        );
        return config;
    },
    field: (field: configTypes.SurveyField, fieldId: number) => {
        field.local_id = fieldId;
        if (field.type === 'Radio' || field.type === 'Selection') {
            field.fields.forEach(
                (fieldOption: configTypes.FieldOption, subSubIndex: number) => {
                    fieldOption.local_id = 1000 * field.local_id + subSubIndex;
                },
            );
        }
    },
};

export default addLocalIds;
