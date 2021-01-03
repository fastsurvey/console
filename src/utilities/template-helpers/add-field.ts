import {configTypes, newFieldId} from 'utilities';

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
                type: 'Option',
                local_id: newFieldId(config),

                title: '',
                description: '',
                mandatory: false,
            };
        case 'Radio':
            return {
                type: 'Radio',
                local_id: newFieldId(config),

                title: '',
                description: '',
                fields: [],
            };
        case 'Selection':
            return {
                type: 'Selection',
                local_id: newFieldId(config),

                title: '',
                description: '',
                min_select: 0,
                max_select: 0,
                fields: [],
            };
        case 'Text':
            return {
                type: 'Text',
                local_id: newFieldId(config),

                title: '',
                description: '',
                min_chars: 0,
                max_chars: 0,
            };
    }
};

export default fieldTemplate;
