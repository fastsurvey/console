import React from 'react';
import {mount, unmount} from '@cypress/react';
import {DatepickerStateWrapper} from './utilities/datepicker-state-wrapper';
import {getElements, assertDataCy} from './utilities/get-field-elements';

it('start: disabled, open and close dropdown', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
    getElements.startToggle();
    getElements.noEndToggle();
    getElements.startToggleYes().should('be.disabled');
    getElements.startToggleNo().should('be.disabled');
    getElements.startDatepicker();
    getElements.datepickerDropdownToggle().should('be.disabled');
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    assertDataCy(getElements.startToggleNo(), 'isactive');
    assertDataCy(getElements.startToggleYes(), 'isinactive');
    unmount();

    mount(
        <DatepickerStateWrapper initialTimestamp={0} disabled={false} type={'start'} />,
    );
    getElements.startToggle();
    getElements.noEndToggle();
    getElements.startToggleYes().should('not.be.disabled');
    getElements.startToggleNo().should('not.be.disabled');
    getElements.noStartDatepicker();
    assertDataCy(getElements.startToggleNo(), 'isinactive');
    assertDataCy(getElements.startToggleYes(), 'isactive');
    unmount();

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={false}
            type={'start'}
        />,
    );
    getElements.startToggle();
    getElements.noEndToggle();
    getElements.startToggleYes().should('not.be.disabled');
    getElements.startToggleNo().should('not.be.disabled');
    getElements.startDatepicker();
    getElements.datepickerDropdownToggle().should('not.be.disabled');
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isopen');
    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    assertDataCy(getElements.startToggleNo(), 'isactive');
    assertDataCy(getElements.startToggleYes(), 'isinactive');
});

it('end: disabled, open and close dropdown', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type='end'
        />,
    );
    getElements.endToggle();
    getElements.noStartToggle();
    getElements.endToggleYes().should('be.disabled');
    getElements.endToggleNo().should('be.disabled');
    getElements.endDatepicker();
    getElements.datepickerDropdownToggle().should('be.disabled');
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    assertDataCy(getElements.endToggleNo(), 'isactive');
    assertDataCy(getElements.endToggleYes(), 'isinactive');
    unmount();

    mount(
        <DatepickerStateWrapper initialTimestamp={null} disabled={false} type='end' />,
    );
    getElements.endToggle();
    getElements.noStartToggle();
    getElements.endToggleYes().should('not.be.disabled');
    getElements.endToggleNo().should('not.be.disabled');
    getElements.noEndDatepicker();
    assertDataCy(getElements.endToggleNo(), 'isinactive');
    assertDataCy(getElements.endToggleYes(), 'isactive');
    unmount();

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={false}
            type='end'
        />,
    );
    getElements.endToggle();
    getElements.noStartToggle();
    getElements.endToggleYes().should('not.be.disabled');
    getElements.endToggleNo().should('not.be.disabled');
    getElements.endDatepicker();
    getElements.datepickerDropdownToggle().should('not.be.disabled');
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isopen');
    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
    assertDataCy(getElements.endToggleNo(), 'isactive');
    assertDataCy(getElements.endToggleYes(), 'isinactive');
});

it('calendar picker', () => {
    // test three random dates
    // forEach:
    // * test month label
    // * test day count
    // * test start day
    // * test selected day
    // * test previous/next month

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});

it('hour picker', () => {
    // test three random times

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});
