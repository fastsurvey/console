import {configTypes} from 'utilities';
import {max} from 'lodash';

const optionTemplate = (
    newTitle: string,
    fieldConfig: configTypes.RadioField | configTypes.SelectionField,
): configTypes.RadioField | configTypes.SelectionField => {
    let local_id: number | undefined = max(
        fieldConfig.fields.map(
            (optionConfig: configTypes.FieldOption) => optionConfig.local_id,
        ),
    );
    if (local_id === undefined) {
        local_id = fieldConfig.local_id;
    } else {
        local_id += 1;
    }
    return {
        ...fieldConfig,
        fields: [
            ...fieldConfig.fields,
            {
                type: 'option',
                local_id: 0,
                title: newTitle,
                description: '',
                required: false,
            },
        ],
    };
};

export default optionTemplate;
