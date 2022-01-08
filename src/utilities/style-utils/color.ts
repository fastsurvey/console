import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-green-75 text-green-900 svg-field-green';
            case 'selection':
                return 'bg-blue-75 text-blue-900 svg-field-blue';
            case 'text':
                return 'bg-blue-75 text-blue-900 svg-field-blue';
            case 'break':
                return 'bg-rose-75 text-rose-900 svg-field-rose';
            case 'markdown':
                return 'bg-rose-75 text-rose-900 svg-field-rose';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
