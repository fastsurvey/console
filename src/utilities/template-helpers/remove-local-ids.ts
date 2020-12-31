import {configTypes} from 'utilities';

const removeLocalIds = {
    field: (config: configTypes.SurveyField) => {
        // @ts-ignore
        delete config.local_id;
        if (config.type === 'Radio' || config.type === 'Selection') {
            config.fields.forEach((field: configTypes.FieldOption) => {
                // @ts-ignore
                delete field.local_id;
            });
        }
        return config;
    },
};

export default removeLocalIds;
