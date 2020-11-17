import React, {useEffect, useState} from 'react';
import VisualDatePicker from './visual-date-picker';

interface DatePickerProps {
    timestamp: number;
    setNewTimestamp(timestamp: number): void;
    disabled?: boolean;
}
function DatePicker(props: DatePickerProps) {
    const [date, setDate] = useState(new Date(props.timestamp * 1000));
    useEffect(() => setDate(new Date(props.timestamp * 1000)), [
        props.timestamp,
    ]);

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    function changeDay(newValue: number) {
        const newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            newValue,
            date.getHours(),
            date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }
    function changeMonth(newValue: number) {
        const day = Math.min(
            date.getDate(),
            getDaysInMonth(date.getFullYear(), newValue),
        );

        const newDate = new Date(
            date.getFullYear(),
            newValue,
            day,
            date.getHours(),
            date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }
    function changeYear(newValue: number) {
        const day = Math.min(
            date.getDate(),
            getDaysInMonth(newValue, date.getMonth()),
        );

        const newDate = new Date(
            newValue,
            date.getMonth(),
            day,
            date.getHours(),
            date.getMinutes(),
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }

    function changeTime(newHours: number, newMinutes: number) {
        const newDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            newHours,
            newMinutes,
        );
        props.setNewTimestamp(newDate.getTime() / 1000);
    }

    return (
        <VisualDatePicker
            disabled={props.disabled}
            {...{
                date,
                getDaysInMonth,
                changeDay,
                changeMonth,
                changeYear,
                changeTime,
            }}
        />
    );
}

export default DatePicker;
