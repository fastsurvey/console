import React from 'react';
import DropDown from '../../../../../components/formFields/DropDown';
import {MONTHS, YEARS, HOURS, MINUTES} from '../constants';

interface DateSelectorProps {
    date: any;
    setNewTimestamp(timestamp: number): void;
}
function DateSelector(props: DateSelectorProps) {
    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }
    const DAYS_IN_MONTH = getDaysInMonth(
        props.date.getYear(),
        props.date.getMonth(),
    );

    const DAYS = [...Array(DAYS_IN_MONTH).keys()].map((i) => {
        return {label: (i + 1).toString(), value: i + 1};
    });

    function changeDay(newValue: number) {
        const newDate = new Date(
            props.date.getYear() + 1900,
            props.date.getMonth(),
            newValue,
            props.date.getHours(),
            props.date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }
    function changeMonth(newValue: number) {
        const day = Math.min(
            props.date.getDate(),
            getDaysInMonth(props.date.getYear(), newValue),
        );

        const newDate = new Date(
            props.date.getYear() + 1900,
            newValue,
            day,
            props.date.getHours(),
            props.date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }
    function changeYear(newValue: number) {
        const day = Math.min(
            props.date.getDate(),
            getDaysInMonth(newValue, props.date.getMonth()),
        );

        const newDate = new Date(
            newValue + 1900,
            props.date.getMonth(),
            day,
            props.date.getHours(),
            props.date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }

    function changeTime(newHours: number, newMinutes: number) {
        const newDate = new Date(
            props.date.getYear() + 1900,
            props.date.getMonth(),
            props.date.getDate(),
            newHours,
            newMinutes,
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }

    return (
        <React.Fragment>
            <div className='mr-2 w-14'>
                <DropDown
                    value={props.date.getDate()}
                    onChange={(newValue: number) => {
                        changeDay(newValue);
                    }}
                    options={DAYS}
                    hideChevron
                />
            </div>
            {DateSeparator('.')}
            <div className='mx-2 w-36'>
                <DropDown
                    value={props.date.getMonth()}
                    onChange={(newValue: number) => {
                        changeMonth(newValue);
                    }}
                    options={MONTHS}
                    hideChevron
                />
            </div>
            {DateSeparator('.')}
            <div className='ml-2 mr-8 w-22'>
                <DropDown
                    value={props.date.getYear()}
                    onChange={(newValue: number) => {
                        changeYear(newValue);
                    }}
                    options={YEARS}
                    hideChevron
                />
            </div>
            <div className='mx-2 w-14'>
                <DropDown
                    value={props.date.getHours()}
                    onChange={(newValue: number) => {
                        changeTime(newValue, props.date.getMinutes());
                    }}
                    options={HOURS}
                    hideChevron
                />
            </div>
            {DateSeparator(':')}
            <div className='ml-2 w-14'>
                <DropDown
                    value={props.date.getMinutes()}
                    onChange={(newValue: number) => {
                        changeTime(props.date.getHours(), newValue);
                    }}
                    options={MINUTES}
                    hideChevron
                />
            </div>
        </React.Fragment>
    );
}

const DateSeparator = (char: string) => (
    <div className='h-12 text-lg text-gray-800 leading-12 font-weight-700'>
        {char}
    </div>
);

export default DateSelector;
