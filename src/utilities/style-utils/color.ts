import {types} from 'types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-red-100 text-red-600 icon-dark-red';
            case 'option':
                return 'bg-orange-100 text-orange-600 icon-dark-orange';
            case 'radio':
                return 'bg-yellow-100 text-yellow-700 icon-dark-yellow';
            case 'selection':
                return 'bg-green-100 text-green-600 icon-dark-green';
            case 'text':
                return 'bg-teal-100 text-teal-600 icon-dark-teal';
            default:
                return 'bg-blue-100 text-blue-600 icon-dark-blue';
        }
    },
};
