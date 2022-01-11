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

// TODO: Adjust hour/minute to system timezone
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
        getElements.calendarSelectedDayButton().should('have.text', params.selected);
    } else {
        getElements.calendarNoSelectedDayButton();
    }
    getElements
        .calendarDayButton(1)
        .should('have.css', 'grid-column-start', `${params.columnStart}`);
};
const assertTimewheelState = (params: {hour: string; minute: string}) => {
    getElements.calendarHourLabel().should('have.text', params.hour);
    getElements.calendarMinuteLabel().should('have.text', params.minute);
};

const CALENDAR_PAGES = {
    dec: {
        month: 'Dec',
        year: '2018',
        length: 31,
        columnStart: 6,
    },
    jan: {
        month: 'Jan',
        year: '2019',
        length: 31,
        columnStart: 2,
    },
    feb: {
        month: 'Feb',
        year: '2019',
        length: 28,
        columnStart: 5,
    },
    mar: {
        month: 'Mar',
        year: '2019',
        length: 31,
        columnStart: 5,
    },
    apr: {
        month: 'Apr',
        year: '2019',
        length: 30,
        columnStart: 1,
    },
};

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

    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isopen');
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonPrevMonth().click().click();
    assertCalendarState({...CALENDAR_PAGES.dec, selected: undefined});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonNextMonth().click();
    assertCalendarState({...CALENDAR_PAGES.jan, selected: undefined});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonNextMonth().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonNextMonth().click().click();
    assertCalendarState({...CALENDAR_PAGES.apr, selected: undefined});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarDayButton(18).click();
    assertCalendarState({...CALENDAR_PAGES.apr, selected: 18});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonPrevMonth().click().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: undefined});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
});

it('hour picker', () => {
    // test three random times

    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={false}
            type='start'
        />,
    );

    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isopen');
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '20', minute: '33'});

    getElements.calendarButtonIncrementHour().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '21', minute: '33'});

    getElements.calendarButtonDecrementHour().click().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '19', minute: '33'});

    getElements.calendarButtonIncrementMinute().click().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '19', minute: '35'});

    getElements.calendarButtonDecrementMinute().click().click().click();
    assertCalendarState({...CALENDAR_PAGES.feb, selected: 12});
    assertTimewheelState({hour: '19', minute: '32'});

    getElements.calendarButtonNextMonth().click();
    assertCalendarState({...CALENDAR_PAGES.mar, selected: undefined});
    assertTimewheelState({hour: '19', minute: '32'});

    getElements.calendarButtonPrevMonth().click().click().click();
    assertCalendarState({...CALENDAR_PAGES.dec, selected: undefined});
    assertTimewheelState({hour: '19', minute: '32'});

    getElements.datepickerDropdownToggle().click();
    assertDataCy(getElements.datepickerDropdown(), 'isnotopen');
});
