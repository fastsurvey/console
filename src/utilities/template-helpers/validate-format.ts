import {AssertionError} from 'assert';
import {isEqual} from 'lodash';
import {types} from 'types';

function assert(condition: boolean) {
    if (!condition) {
        throw AssertionError;
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

            assert(
                ['Email', 'Option', 'Radio', 'Selection', 'Text'].includes(
                    config.type,
                ),
            );

            const commonKeys = ['type', 'title', 'description'];
            const checkKeys = (specificKeys: string[]) => {
                checkStringArrays(Object.keys(config), [
                    ...commonKeys,
                    ...specificKeys,
                ]);
            };

            switch (config.type) {
                case 'email':
                    checkKeys(['regex', 'hint']);
                    checkTypes(config.regex, 's');
                    checkTypes(config.hint, 's');
                    return true;
                case 'option':
                    checkKeys(['mandatory']);
                    checkTypes(config.required, true);
                    return true;
                case 'radio':
                    checkKeys(['fields']);
                    checkTypes(config.fields, [{}]);
                    assert(validateFormat.fieldOptionsList(config.fields));
                    return true;
                case 'selection':
                    checkKeys(['fields', 'min_select', 'max_select']);
                    checkTypes(config.fields, [{}]);
                    checkTypes(config.min_select, 2);
                    checkTypes(config.max_select, 2);
                    assert(validateFormat.fieldOptionsList(config.fields));
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
                checkTypes(fieldOption.title, 's');
                assert(fieldOption.description === '');
                assert(fieldOption.required === false);
            });
            return true;
        } catch {
            return false;
        }
    },
};

export default validateFormat;
