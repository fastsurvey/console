import React, {useEffect, useState} from 'react';
import VisualDatePicker from './visual-date-picker';
import VisualTimePicker from './visual-time-picker';

interface Props {
    timestamp: number;
    setTimestamp(timestamp: number): void;
    disabled?: boolean;
    'data-cy': string;
}
function DatePicker(props: Props) {
    const [dateStore, setDateStore] = useState(new Date(props.timestamp * 1000));
    useEffect(() => {
        setDateStore(new Date(props.timestamp * 1000));
    }, [props.timestamp]);

    function getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
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
        const ranged = (n: number, to: number) => {
            while (n < 0) {
                n += to;
            }
            return n % to;
        };
        const newDate = new Date(
            dateStore.getFullYear(),
            dateStore.getMonth(),
            dateStore.getDate(),
            t.hour === undefined ? dateStore.getHours() : ranged(t.hour, 24),
            t.minute === undefined ? dateStore.getMinutes() : ranged(t.minute, 60),
        );
        props.setTimestamp(newDate.getTime() / 1000);
    }

    return (
        <div
            className={
                'w-full flex items-start justify-start ' +
                'flex-col md:flex-row gap-y-1.5 md:gap-y-0 md:gap-x-2'
            }
        >
            <VisualDatePicker
                disabled={props.disabled === true}
                {...{
                    dateStore,
                    getDaysInMonth,
                    getFirstWeekday,
                    setDateTimestamp,
                }}
                data-cy={`datepicker-${props['data-cy']}`}
            />
            <VisualTimePicker
                disabled={props.disabled === true}
                {...{
                    dateStore,
                    setHourTimestamp,
                }}
                data-cy={`timepicker-${props['data-cy']}`}
            />
        </div>
    );
}

export default DatePicker;
