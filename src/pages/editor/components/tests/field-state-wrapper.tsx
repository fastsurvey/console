import React, {useState} from 'react';
import {types} from '/src/types';
import Field from '../fields/field';
import '/src/styles/tailwind.out.css';
import {getCySelector} from '../../../../../cypress/support/utilities';
const get = getCySelector;

export function FieldStateWrapper(props: {
    initialFieldConfig: types.SurveyField;
    validation: types.ValidationResult;
    fieldIndex: number;
    disabled: boolean;
}) {
    const [fieldConfig, setFieldConfig] = useState(props.initialFieldConfig);
    const [mounted, setMounted] = useState(true);

    return (
        <div className='w-full h-full px-6 py-12 bg-gray-100'>
            {mounted && (
                <Field
                    configIsDiffering={true}
                    disabled={true}
                    identifierToOrder={{'0': props.fieldIndex + 1}}
                    fieldIndex={props.fieldIndex}
                    localFieldConfig={fieldConfig}
                    setLocalFieldConfig={(
                        fieldConfigChanges: types.SurveyFieldChange,
                    ) => setFieldConfig({...fieldConfig, ...fieldConfigChanges})}
                    validation={props.validation}
                    removeField={() => setMounted(false)}
                />
            )}
        </div>
    );
}

const getFromField =
    (index: number, selectors: string[], props?: {count?: number; invisible?: true}) =>
    () =>
        get([`editor-field-panel-${index} `, ...selectors], props);

export const fieldElements = (index: number) => ({
    panel: getFromField(index, [], {count: 1}),
    buttons: {
        collapse: getFromField(index, ['button-collapse'], {count: 1}),
        copy: getFromField(index, ['button-copy'], {count: 1}),
        remove: getFromField(index, ['button-remove'], {count: 1}),
        addBefore: () => get([`add-field-before-${index}`], {count: 1}),
        pasteBefore: () => get([`paste-field-before-${index}`], {count: 1}),
    },
    inputs: {
        description: getFromField(index, ['input-description'], {count: 1}),
        regex: getFromField(index, ['input-regex'], {count: 1}),
        hint: getFromField(index, ['input-hint'], {count: 1}),
        toggleVerify: getFromField(index, ['toggle-verify'], {count: 1}),
        minChars: getFromField(index, ['input-min-chars'], {count: 1}),
        maxChars: getFromField(index, ['input-max-chars'], {count: 1}),
        optionList: getFromField(index, ['options-list'], {count: 1}),
        anyOptionInput: getFromField(index, ['options-list', 'input-option']),
        optionInput: (optionIndex: number) =>
            get([
                `editor-field-panel-${index}`,
                'options-list',
                `input-option-${optionIndex}`,
            ]),
        addOption: getFromField(index, ['options-list', 'button-add'], {count: 1}),
        minSelect: getFromField(index, ['input-min-select'], {count: 1}),
        maxSelect: getFromField(index, ['input-max-select'], {count: 1}),
    },
});
