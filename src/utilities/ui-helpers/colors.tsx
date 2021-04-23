import {types} from 'types';

const colors = {
    fieldTypeToColor: (fieldType: types.FieldType) => {
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
        }
    },

    colorToClasses: (color: types.Color | undefined) => {
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
            default:
                return 'bg-gray-300 text-gray-600';
        }
    },
};

export default colors;
