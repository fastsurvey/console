import {isEqual} from 'lodash';
import {types} from '/src/types';

function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

const assertTypeEquality = (a: any, b: any) => {
    assert(typeof a === typeof b);
};

const validateFormat = {
    fieldConfig: (config: types.SurveyField) => {
        try {
            assert(
                ['email', 'selection', 'text', 'break', 'markdown'].includes(
                    config.type,
                ),
            );

            const assertFieldAttributes = (specificKeys: string[]) => {
                assert(
                    isEqual(
                        Object.keys(config).sort(),
                        ['type', ...specificKeys].sort(),
                    ),
                );
            };

            switch (config.type) {
                case 'email':
                    assertFieldAttributes(['description', 'regex', 'hint', 'verify']);
                    assertTypeEquality(config.regex, 's');
                    assertTypeEquality(config.hint, 's');
                    assertTypeEquality(config.description, 's');
                    assertTypeEquality(config.verify, true);
                    return true;
                case 'selection':
                    assertFieldAttributes([
                        'description',
                        'options',
                        'min_select',
                        'max_select',
                    ]);
                    assertTypeEquality(config.options, [{}]);
                    assertTypeEquality(config.description, 's');
                    assertTypeEquality(config.min_select, 2);
                    assertTypeEquality(config.max_select, 2);
                    assert(validateFormat.fieldOptionsList(config.options));
                    return true;
                case 'text':
                    assertFieldAttributes(['description', 'min_chars', 'max_chars']);
                    assertTypeEquality(config.description, 's');
                    assertTypeEquality(config.min_chars, 2);
                    assertTypeEquality(config.max_chars, 2);
                    return true;
                case 'break':
                    assertFieldAttributes([]);
                    return true;
                case 'markdown':
                    assertFieldAttributes(['description']);
                    assertTypeEquality(config.description, 's');
                    return true;
                default:
                    throw `Invalid field config: ${config}`;
            }
        } catch {
            return false;
        }
    },
    fieldOptionsList: (fieldOptions: types.FieldOption[]) => {
        try {
            fieldOptions.forEach((fieldOption) => {
                assertTypeEquality(fieldOption, 's');
            });
            return true;
        } catch {
            return false;
        }
    },
};

export default validateFormat;
