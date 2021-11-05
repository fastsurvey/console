import {types} from '/src/types';
import {icons as iconAssets} from '/src/assets';

export const icons = {
    fieldTypeToIcon: (fieldType: types.FieldType | undefined) => {
        switch (fieldType) {
            case 'email':
                return iconAssets.email;
            case 'text':
                return iconAssets.textCursor;
            case 'option':
            case 'radio':
            case 'selection':
                return iconAssets.checkCircle;
        }
    },
};
