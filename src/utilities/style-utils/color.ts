import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-green-100 text-green-900 svg-field-green';
            case 'selection':
                return 'bg-blue-100 text-blue-900 svg-field-blue';
            case 'text':
                return 'bg-blue-100 text-blue-900 svg-field-blue';
            case 'break':
                return 'text-gray-700 svg-field-gray';
            case 'markdown':
                return 'bg-rose-100 border-rose-400 text-rose-900 svg-field-rose';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
