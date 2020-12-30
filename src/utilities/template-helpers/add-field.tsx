import {configTypes} from 'utilities';
import {max} from 'lodash';

function newFieldId(config: configTypes.SurveyConfig): number {
    const maxId = max(
        config.fields.map((field: configTypes.SurveyField) => field.local_id),
    );
    if (maxId === undefined) {
        return config.local_id;
    }
    return maxId + 1;
}

const fieldTemplate = (
    fieldType: configTypes.FieldType,
    config: configTypes.SurveyConfig,
): configTypes.SurveyField => {
    switch (fieldType) {
        case 'Email':
            return {
                type: 'Email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
        case 'Option':
            return {
                type: 'Email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
        case 'Radio':
            return {
                type: 'Email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
        case 'Selection':
            return {
                type: 'Email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
        case 'Text':
            return {
                type: 'Email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
    }
};

export default fieldTemplate;
