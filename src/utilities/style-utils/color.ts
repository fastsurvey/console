import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-red-100 text-red-900 icon-dark-red';
            case 'selection':
                return 'bg-green-100 text-green-900 icon-dark-green';
            case 'text':
                return 'bg-cyan-100 text-cyan-900 icon-dark-cyan';
        }
    },
};
