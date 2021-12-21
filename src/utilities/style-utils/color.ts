import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-red-100 text-red-900 svg-field-red';
            case 'selection':
                return 'bg-green-100 text-green-900 svg-field-green';
            case 'text':
                return 'bg-cyan-100 text-cyan-900 svg-field-cyan';
            case 'break':
            case 'markdown':
                // TODO: Choose color
                return 'bg-white text-gray-800 svg-field-cyan';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
