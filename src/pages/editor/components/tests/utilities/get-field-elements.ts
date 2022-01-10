import {getCySelector} from '../../../../../../cypress/support/utilities';
const get = getCySelector;

const getFromField =
    (index: number, selectors: string[], props?: {count?: number; invisible?: true}) =>
    () =>
        get([`editor-field-panel-${index} `, ...selectors], props);

export const getFieldElements = (index: number) => ({
    panel: getFromField(index, [], {count: 1}),
    noPanel: getFromField(index, [], {count: 0}),
    label: getFromField(index, ['card-label'], {count: 1}),
    longLabel: getFromField(index, ['card-long-label'], {count: 1}),
    validationBar: getFromField(index, ['validation-bar'], {count: 1, invisible: true}),
    validationMessage: getFromField(index, ['validation-bar', 'message'], {count: 1}),
    panelMarkdownHelp: getFromField(index, ['panel-markdown-help'], {count: 1}),
    noPanelMarkdownHelp: getFromField(index, ['panel-markdown-help'], {count: 0}),
    markdownContent: getFromField(index, ['markdown-content'], {count: 1}),
    buttons: {
        collapse: getFromField(index, ['button-collapse'], {count: 1}),
        copy: getFromField(index, ['button-copy'], {count: 1}),
        remove: getFromField(index, ['button-remove'], {count: 1}),
        addBefore: () => get([`add-field-before-${index}`], {count: 1}),
        pasteBefore: () => get([`paste-field-before-${index}`], {count: 1}),
        markdownTab: (tab: 'plain-text' | 'split-view' | 'rendered') =>
            get([`editor-field-panel-${index} `, `tab-${tab}`], {count: 1}),
        markdownHelp: getFromField(index, [`button-markdown-help`], {count: 1}),
        markdownDemo: getFromField(index, [`button-markdown-demo`], {count: 1}),
    },
    inputs: {
        description: getFromField(index, ['input-description'], {count: 1}),
        regex: getFromField(index, ['input-regex'], {count: 1}),
        hint: getFromField(index, ['input-hint'], {count: 1}),

        toggleVerify: getFromField(index, ['toggle-verify'], {count: 1}),
        toggleVerifyYes: getFromField(index, ['toggle-verify', 'yes'], {count: 1}),
        toggleVerifyNo: getFromField(index, ['toggle-verify', 'no'], {count: 1}),

        dropDownEmailFormat: getFromField(index, ['dropdown-email-format'], {count: 1}),
        dropDownEmailFormatToggle: getFromField(
            index,
            ['dropdown-email-format', 'button-toggle'],
            {count: 1},
        ),
        dropDownEmailFormatOption: (optionIndex: number) =>
            get([
                `editor-field-panel-${index}`,
                'dropdown-email-format',
                `button-option-${optionIndex} `,
            ]),

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
