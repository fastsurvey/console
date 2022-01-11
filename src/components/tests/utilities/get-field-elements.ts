import * as utilities from '../../../../cypress/support/utilities';

const get = utilities.getCySelector;
export const assertDataCy = utilities.assertDataCy;

export const getElements = {
    startToggle: () => get(['start-toggle'], {count: 1}),
    noStartToggle: () => get(['start-toggle'], {count: 0}),
    startToggleYes: () => get(['start-toggle', 'yes'], {count: 1}),
    startToggleNo: () => get(['start-toggle', 'no'], {count: 1}),

    endToggle: () => get(['end-toggle'], {count: 1}),
    noEndToggle: () => get(['end-toggle'], {count: 0}),
    endToggleYes: () => get(['end-toggle', 'yes'], {count: 1}),
    endToggleNo: () => get(['end-toggle', 'no'], {count: 1}),

    startDatepicker: () => get(['start-datepicker'], {count: 1}),
    noStartDatepicker: () => get(['start-datepicker'], {count: 0}),
    endDatepicker: () => get(['end-datepicker'], {count: 1}),
    noEndDatepicker: () => get(['end-datepicker'], {count: 0}),

    datepickerDropdownToggle: () =>
        get(['datepicker ', 'dropdown-toggle '], {count: 1}),
    datepickerDropdown: () =>
        get(['datepicker', 'dropdown '], {count: 1, invisible: true}),
};
