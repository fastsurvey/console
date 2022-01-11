import {types} from '/src/types';
import {icons as iconAssets} from '/src/assets';

export const icons = {
    fieldTypeToIcon: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return iconAssets.email;
            case 'text':
                return iconAssets.textCursor;
            case 'selection':
                return iconAssets.checkCircle;
            case 'break':
                return iconAssets.pageSplit;
            case 'markdown':
                return iconAssets.paragraph;
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
