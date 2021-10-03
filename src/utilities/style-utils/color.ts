import {types} from '@types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-red-100 text-red-900 icon-dark-red';
            case 'option':
                return 'bg-orange-100 text-orange-900 icon-dark-orange';
            case 'radio':
                return 'bg-yellow-100 text-yellow-900 icon-dark-yellow';
            case 'selection':
                return 'bg-green-100 text-green-900 icon-dark-green';
            case 'text':
                return 'bg-cyan-100 text-cyan-900 icon-dark-cyan';
            default:
                return 'bg-blue-100 text-blue-900 icon-dark-blue';
        }
    },
};
