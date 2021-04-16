import {configTypes} from 'utilities';

const removeLocalIds = {
    field: (config: configTypes.SurveyField) => {
        // @ts-ignore
        delete config.local_id;
        if (config.type === 'radio' || config.type === 'selection') {
            config.fields.forEach((field: configTypes.FieldOption) => {
                // @ts-ignore
                delete field.local_id;
            });
        }
        return config;
    },
};

export default removeLocalIds;
