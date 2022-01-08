import {types} from '/src/types';

export const color = {
    fieldTypeToClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'bg-green-75 text-green-900';
            case 'selection':
            case 'text':
                return 'bg-blue-75 text-blue-900';
            case 'break':
            case 'markdown':
                return 'bg-rose-75 text-rose-900';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
    fieldTypeToFieldIconClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'svg-field-green';
            case 'selection':
            case 'text':
                return 'svg-field-blue';
            case 'break':
            case 'markdown':
                return 'svg-field-rose';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
    fieldTypeToActionIconClasses: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return 'svg-field-action-green';
            case 'selection':
            case 'text':
                return 'svg-field-action-blue';
            case 'break':
            case 'markdown':
                return 'svg-field-action-rose';
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
