import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-red-100 border-red-200 text-red-900 svg-field-red';
            case 'selection':
                return 'bg-green-100 border-green-200 text-green-900 svg-field-green';
            case 'text':
                return 'bg-cyan-100 border-cyan-200 text-cyan-900 svg-field-cyan';
            case 'break':
            case 'markdown':
                // TODO: Choose color
                return 'bg-yellow-100 border-yellow-200 text-yellow-900 svg-field-yellow';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
