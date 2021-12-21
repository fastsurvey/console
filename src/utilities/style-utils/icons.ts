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
                // TODO: Choose icon
                return iconAssets.checkCircle;
            case 'markdown':
                // TODO: Choose icon
                return iconAssets.checkCircle;
            default:
                throw `Invalid field type: ${fieldType}`;
        }
    },
};
