import {types} from '@types';
import {icons as iconAssets} from '@assets';

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
