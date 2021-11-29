import {isEqual} from 'lodash';
import {types} from '/src/types';

function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

const checkTypes = (a: any, b: any) => {
    assert(typeof a === typeof b);
};

const checkStringArrays = (a: string[], b: string[]) => {
    assert(isEqual(a.sort(), b.sort()));
};

const validateFormat = {
    fieldConfig: (config: types.SurveyField) => {
        try {
            checkTypes(config.title, 's');
            checkTypes(config.description, 's');

            assert(['email', 'selection', 'text'].includes(config.type));

            const commonKeys = ['type', 'title', 'description'];
            const checkKeys = (specificKeys: string[]) => {
                checkStringArrays(Object.keys(config), [
                    ...commonKeys,
                    ...specificKeys,
                ]);
            };

            switch (config.type) {
                case 'email':
                    checkKeys(['regex', 'hint', 'verify']);
                    checkTypes(config.regex, 's');
                    checkTypes(config.hint, 's');
                    checkTypes(config.verify, true);
                    return true;
                case 'selection':
                    checkKeys(['options', 'min_select', 'max_select']);
                    checkTypes(config.options, [{}]);
                    checkTypes(config.min_select, 2);
                    checkTypes(config.max_select, 2);
                    assert(validateFormat.fieldOptionsList(config.options));
                    return true;
                case 'text':
                    checkKeys(['min_chars', 'max_chars']);
                    checkTypes(config.min_chars, 2);
                    checkTypes(config.max_chars, 2);
                    return true;
            }
        } catch {
            return false;
        }
    },
    fieldOptionsList: (fieldOptions: types.FieldOption[]) => {
        try {
            fieldOptions.forEach((fieldOption) => {
                checkTypes(fieldOption, 's');
            });
            return true;
        } catch {
            return false;
        }
    },
};

export default validateFormat;
