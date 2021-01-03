// @ts-nocheck
import {validateFormat} from 'utilities';

const validateOptions = validateFormat.fieldOptionsList;
const validateField = validateFormat.fieldConfig;

const fieldTest = (validSelection: object, result: boolean) => (
    additionalProps: object,
) => {
    let result = validateField({...validSelection, ...additionalProps});
    expect(result).toBe(result);
};

describe('validateFormat.fieldOptionsList', () => {
    it('empty list', () => {
        let result = validateOptions([]);
        expect(result).toBe(true);
    });

    it('valid list', () => {
        let result = validateOptions([
            {title: 'sdsf', description: '', mandatory: false},
        ]);
        expect(result).toBe(true);
    });

    it('invalid list', () => {
        let result1 = validateOptions([
            {title: 'sdsf', description: 'era', mandatory: false},
        ]);
        expect(result1).toBe(false);

        let result2 = validateOptions([
            {title: 'sdsf', description: '', mandatory: true},
        ]);
        expect(result2).toBe(false);

        let result3 = validateOptions([
            {title: true, description: '', mandatory: true},
        ]);
        expect(result3).toBe(false);
    });
});

describe('validateFormat.fieldConfig', () => {
    const generalField = (type: string) => ({
        type: type,
        title: '',
        description: '',
    });

    const validEmail = {
        ...generalField('Email'),
        regex: '',
        hint: '',
    };
    const validOption = {
        ...generalField('Option'),
        mandatory: false,
    };
    const validRadio = {
        ...generalField('Radio'),
        fields: [],
    };
    const validSelection = {
        ...generalField('Selection'),
        min_select: 0,
        max_select: 0,
        fields: [],
    };
    const validText = {
        ...generalField('Text'),
        min_chars: 0,
        max_chars: 0,
    };

    it('invalid field type', () => {
        const runTest = fieldTest(validEmail, false);
        runTest({type: 'fghj'});
    });

    it('valid email', () => {
        fieldTest(validEmail, true)();
    });

    it('valid option', () => {
        fieldTest(validOption, true)();
    });

    it('valid radio', () => {
        fieldTest(validRadio, true)();
    });

    it('valid selection', () => {
        fieldTest(validSelection, true)();
    });

    it('valid text', () => {
        fieldTest(validText, true)();
    });

    /* Invalid stuff now */

    it('invalid email', () => {
        const runTest = fieldTest(validEmail, false);
        runTest({title: true});
        runTest({description: true});
        runTest({regex: true});
        runTest({hint: true});
        runTest({unwanted: 0});
    });

    // From now on I don't have to check title and description
    // anymore since the validation of those keys happens before
    // any field specific stuff

    it('invalid option', () => {
        const runTest = fieldTest(validOption, false);
        runTest({mandatory: ''});
        runTest({unwanted: 0});
    });

    it('invalid radio', () => {
        const runTest = fieldTest(validRadio, false);
        runTest({fields: [true, false]});
        runTest({unwanted: 0});
    });

    it('invalid selection', () => {
        const runTest = fieldTest(validSelection, false);
        runTest({fields: [true, false]});
        runTest({min_select: true});
        runTest({max_select: true});
        runTest({unwanted: 0});
    });

    it('invalid text', () => {
        const runTest = fieldTest(validText, false);
        runTest({min_chars: true});
        runTest({max_chars: true});
        runTest({unwanted: 0});
    });
});
