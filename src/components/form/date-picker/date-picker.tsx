import React, {useEffect, useState} from 'react';
import VisualDatePicker from './visual-date-picker';
import {Toggle} from '/src/components';

function DatePicker(props: {
    timestamp: number | null;
    setTimestamp(timestamp: number | null): void;
    disabled: boolean;
    'data-cy': string;
    type: 'start' | 'end';
}) {
    const [dateStore, setDateStore] = useState(new Date((props.timestamp || 0) * 1000));
    useEffect(() => {
        setDateStore(new Date((props.timestamp || 0) * 1000));
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
        <div className={'w-full flex items-start justify-start flex-col gap-y-1.5'}>
            {props.type === 'start' && (
                <Toggle
                    trueLabel='Always open'
                    falseLabel='Specific start time'
                    value={props.timestamp === 0}
                    setValue={(v: boolean) =>
                        props.setTimestamp(
                            v ? 0 : Math.round(new Date().getTime() / 1000),
                        )
                    }
                />
            )}
            {props.type === 'end' && (
                <Toggle
                    trueLabel='Never ends'
                    falseLabel='Specific end time'
                    value={props.timestamp === null}
                    setValue={(v: boolean) =>
                        props.setTimestamp(
                            v ? null : Math.round(new Date().getTime() / 1000) + 86400,
                        )
                    }
                />
            )}
            {((props.type === 'start' && props.timestamp !== 0) ||
                (props.type === 'end' && props.timestamp !== null)) && (
                <VisualDatePicker
                    disabled={props.disabled === true}
                    {...{
                        dateStore,
                        getDaysInMonth,
                        getFirstWeekday,
                        setDateTimestamp,
                        setHourTimestamp,
                    }}
                    data-cy={props['data-cy']}
                />
            )}
        </div>
    );
}

export default DatePicker;
