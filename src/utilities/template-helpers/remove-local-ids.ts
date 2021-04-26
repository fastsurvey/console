import {types} from 'types';

const removeLocalIds = {
    survey: (config: types.SurveyConfig) => {
        // @ts-ignore
        delete config.local_id;
        config.fields = config.fields.map(removeLocalIds.field);
        return config;
    },
    field: (config: types.SurveyField) => {
        // @ts-ignore
        delete config.local_id;
        if (config.type === 'radio' || config.type === 'selection') {
            config.fields.forEach((field: types.FieldOption) => {
                // @ts-ignore
                delete field.local_id;
            });
        }
        return config;
    },
};

export default removeLocalIds;
