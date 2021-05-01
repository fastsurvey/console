import {types} from 'types';
import {max} from 'lodash';
import localIdUtils from '../local-id-utils/index';

const optionTemplate = (
    newTitle: string,
    fieldConfig: types.RadioField | types.SelectionField,
): types.RadioField | types.SelectionField => {
    return {
        ...fieldConfig,
        fields: [
            ...fieldConfig.fields,
            {
                type: 'option',
                local_id: localIdUtils.newId.fieldOption(fieldConfig),
                title: newTitle,
                description: '',
                required: false,
            },
        ],
    };
};

export default optionTemplate;
