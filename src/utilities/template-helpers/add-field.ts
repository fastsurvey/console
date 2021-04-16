import {configTypes, newFieldId} from 'utilities';

const fieldTemplate = (
    fieldType: configTypes.FieldType,
    config: configTypes.SurveyConfig,
): configTypes.SurveyField => {
    switch (fieldType) {
        case 'email':
            return {
                type: 'email',
                local_id: newFieldId(config),

                title: '',
                description: '',
                regex: '.*',
                hint: 'Any email address',
            };
        case 'option':
            return {
                type: 'option',
                local_id: newFieldId(config),

                title: '',
                description: '',
                required: false,
            };
        case 'radio':
            return {
                type: 'radio',
                local_id: newFieldId(config),

                title: '',
                description: '',
                fields: [],
            };
        case 'selection':
            return {
                type: 'selection',
                local_id: newFieldId(config),

                title: '',
                description: '',
                min_select: 0,
                max_select: 0,
                fields: [],
            };
        case 'text':
            return {
                type: 'text',
                local_id: newFieldId(config),

                title: '',
                description: '',
                min_chars: 0,
                max_chars: 0,
            };
    }
};

export default fieldTemplate;
