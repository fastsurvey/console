import React from 'react';
import {mount, unmount} from '@cypress/react';
import {DatepickerStateWrapper} from './utilities/datepicker-state-wrapper';
import {getElements, assertDataCy} from './utilities/get-field-elements';
import {stringify} from 'querystring';

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
    // * test month/year label
    // * test day count
    // * test start day
    // * test selected day
    // * test previous/next month

    // same test for both start- and end-datepicker
    // since calendar picker is the same

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={false}
            type='start'
        />,
    );

    const assertCalendarState = (params: {
        month: string;
        year: string;
        length: Number;
        selected?: number;
        columnStart: number;
    }) => {
        getElements.calendarMonthLabel().should('have.text', params.month);
        getElements.calendarYearLabel().should('have.text', params.year);
        getElements.calendarAnyDayButton().should('have.length', params.length);
        if (params.selected !== undefined) {
            getElements
                .calendarSelectedDayButton()
                .should('have.text', params.selected);
        } else {
            getElements.calendarNoSelectedDayButton();
        }
        getElements
            .calendarDayButton(1)
            .should('have.css', 'grid-column-start', `${params.columnStart}`);
    };

    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isopen');

    assertCalendarState({
        month: 'Feb',
        year: '2019',
        length: 28,
        selected: 12,
        columnStart: 5,
    });

    getElements.calendarButtonPrevMonth().click().click();
    assertCalendarState({
        month: 'Dec',
        year: '2018',
        length: 31,
        selected: undefined,
        columnStart: 6,
    });

    getElements.calendarButtonNextMonth().click();
    assertCalendarState({
        month: 'Jan',
        year: '2019',
        length: 31,
        selected: undefined,
        columnStart: 2,
    });

    getElements.calendarButtonNextMonth().click();
    assertCalendarState({
        month: 'Feb',
        year: '2019',
        length: 28,
        selected: 12,
        columnStart: 5,
    });

    getElements.calendarButtonNextMonth().click().click();
    assertCalendarState({
        month: 'Apr',
        year: '2019',
        length: 30,
        selected: undefined,
        columnStart: 1,
    });

    getElements.calendarDayButton(18).click();
    assertCalendarState({
        month: 'Apr',
        year: '2019',
        length: 30,
        selected: 18,
        columnStart: 1,
    });

    getElements.calendarButtonPrevMonth().click().click();
    assertCalendarState({
        month: 'Feb',
        year: '2019',
        length: 28,
        selected: undefined,
        columnStart: 5,
    });
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
