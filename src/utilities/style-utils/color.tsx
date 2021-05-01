import {types} from 'types';

export const color = {
    fieldTypeToColor: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'red';
            case 'option':
                return 'orange';
            case 'radio':
                return 'yellow';
            case 'selection':
                return 'green';
            case 'text':
                return 'teal';
            default:
                return 'gray';
        }
    },

    colorToClasses: (color: types.Color) => {
        switch (color) {
            case 'red':
                return 'bg-red-200 text-red-600';
            case 'orange':
                return 'bg-orange-200 text-orange-600';
            case 'yellow':
                return 'bg-yellow-200 text-yellow-600';
            case 'green':
                return 'bg-green-200 text-green-600';
            case 'teal':
                return 'bg-teal-200 text-teal-600';
            case 'gray':
                return 'bg-gray-300 text-gray-600';
        }
    },

    fieldTypeToClasses: (fieldType: types.FieldType | undefined) =>
        color.colorToClasses(color.fieldTypeToColor(fieldType)),
};
