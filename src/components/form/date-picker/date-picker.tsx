import React, {useEffect, useState} from 'react';
import VisualDatePicker from './visual-date-picker';

interface Props {
    timestamp: number;
    setTimestamp(timestamp: number): void;
    disabled?: boolean;
}
function DatePicker(props: Props) {
    const [dateStore, setDateStore] = useState(
        new Date(props.timestamp * 1000),
    );
    useEffect(() => {
        setDateStore(new Date(props.timestamp * 1000));
    }, [props.timestamp]);

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month, 0).getDate();
    }

    function getFirstWeekday(year: number, month: number) {
        return new Date(year, month, 0).getDay();
    }

    function setDateTimestamp(t: {year: number; month: number; day: number}) {
        const newDate = new Date(
            t.year,
            t.month,
            t.day,
            dateStore.getHours(),
            dateStore.getMinutes(),
        );
        props.setTimestamp(newDate.getTime() / 1000);
    }

    function setHourTimestamp(t: {hour?: number; minute?: number}) {
        const newDate = new Date(
            dateStore.getFullYear(),
            dateStore.getMonth(),
            dateStore.getDate(),
            t.hour ? t.hour : dateStore.getHours(),
            t.minute ? t.minute : dateStore.getMinutes(),
        );
        props.setTimestamp(newDate.getTime() / 1000);
    }

    return (
        <VisualDatePicker
            disabled={props.disabled === true}
            {...{
                dateStore,
                getDaysInMonth,
                getFirstWeekday,
                setDateTimestamp,
                setHourTimestamp,
            }}
        />
    );
}

export default DatePicker;
