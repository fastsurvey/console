import {configTypes} from 'utilities';
import {generalTypes} from 'utilities/types/general-types';

const colors = {
    fieldTypeToColor: (fieldType: configTypes.FieldType) => {
        switch (fieldType) {
            case 'Email':
                return 'red';
            case 'Option':
                return 'orange';
            case 'Radio':
                return 'yellow';
            case 'Selection':
                return 'green';
            case 'Text':
                return 'teal';
        }
    },

    colorToClasses: (color: generalTypes.Color | undefined) => {
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
