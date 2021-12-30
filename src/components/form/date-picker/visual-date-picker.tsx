import React, {useState, useRef, useEffect} from 'react';
import {icons} from '/src/assets';
import {constants} from '/src/utilities';
import {range} from 'lodash';
import {DayButton} from './components/day-button';
import {remove} from '../../../utilities/local-id-utils/remove';

function VisualDatePicker(props: {
    disabled: boolean;
    dateStore: Date;
    getDaysInMonth(year: number, month: number): number;
    getFirstWeekday(year: number, month: number): number;
    setDateTimestamp(t: {year: number; month: number; day: number}): void;
    setHourTimestamp(t: {hour?: number; minute?: number}): void;
    'data-cy'?: string;
}) {
    const {dateStore: date, setDateTimestamp, setHourTimestamp, disabled} = props;

    const [open, setOpen] = useState(false);
    const [visibleMonth, setVisibleMonth] = useState(date.getMonth());
    const [visibleYear, setVisibleYear] = useState(date.getFullYear());

    useEffect(() => {
        setVisibleMonth(date.getMonth());
        setVisibleYear(date.getFullYear());
    }, [date]);

    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (props.disabled) {
            setOpen(false);
        }
    }, [props.disabled]);

    function prevMonth() {
        if (visibleMonth === 0) {
            setVisibleYear(visibleYear - 1);
            setVisibleMonth(11);
        } else {
            setVisibleMonth(visibleMonth - 1);
        }
    }

    function nextMonth() {
        if (visibleMonth === 11) {
            setVisibleYear(visibleYear + 1);
            setVisibleMonth(0);
        } else {
            setVisibleMonth(visibleMonth + 1);
        }
    }

    const skippedDays = props.getFirstWeekday(visibleYear, visibleMonth);
    const dayCount = props.getDaysInMonth(visibleYear, visibleMonth);

    // 1. how many days in the first row?
    // 2. how many days in the last not-filled row?
    // 3. how many days fully filled rows?
    const dayCountHead = 7 - skippedDays;
    const dayCountLast = (dayCount - dayCountHead) % 7;
    const dayCountFullRows = (dayCount - dayCountHead - dayCountLast) / 7;

    const sharedCalendarRowClasses =
        'h-7 sm:h-5 rounded-sm bg-gray-700 z-0 pointer-events-none absolute opacity-70 ';
    return (
        <div
            className={'flex-col-left ' + (!open ? 'h-9 ' : ' ')}
            data-cy={props['data-cy']}
        >
            <button
                ref={ref}
                className={
                    'px-1 w-full flex-row-left rounded h-9 ringable font-weight-500 ' +
                    (open || disabled
                        ? 'bg-gray-200 text-gray-600 '
                        : 'bg-gray-100 text-gray-800 ') +
                    (disabled ? 'cursor-not-allowed ' : '')
                }
                onClick={() => setOpen(!open)}
                disabled={disabled}
            >
                <div className='p-1 w-7 h-7 icon-dark-gray'>{icons.calendar}</div>
                <div className='px-1'>
                    {date.getDate().toString().padStart(2, '0')}.
                    {(date.getMonth() + 1).toString().padStart(2, '0')}.
                    {date.getFullYear().toString().padStart(2, '0')},
                </div>
                <div className='flex-shrink-0 w-5 text-center'>
                    {date.getHours().toString().padStart(2, '0')}
                </div>
                :
                <div className='flex-shrink-0 w-5 text-center'>
                    {date.getMinutes().toString().padStart(2, '0')}
                </div>
            </button>
            <div
                className={
                    'flex flex-col sm:flex-row items-start justify-start gap-x-2'
                }
            >
                <div
                    className={
                        'overflow-hidden z-40 px-[5px] flex-col-center ' +
                        'bg-gray-800 rounded shadow-sm no-selection ' +
                        (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                    }
                >
                    <div className='mb-1.5 centering-row'>
                        <button
                            className={
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform rotate-90 icon-white ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={prevMonth}
                            disabled={!open}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab' && e.shiftKey) {
                                    setOpen(false);
                                }
                            }}
                        >
                            {icons.chevronDown}
                        </button>
                        <div className='text-white w-22 centering-row'>
                            <div className='flex-shrink-0 w-10 text-center'>
                                {constants.formOptions.MONTHS[visibleMonth]}
                            </div>
                            <div className='flex-shrink-0 w-10 text-center'>
                                {visibleYear}
                            </div>
                        </div>
                        <button
                            className={
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform -rotate-90 icon-white ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={nextMonth}
                            disabled={!open}
                        >
                            {icons.chevronDown}
                        </button>
                    </div>
                    <div className='px-2 pb-2 text-sm text-gray-300 sm:px-4 sm:pb-4 flex-col-left gap-y-2'>
                        <div className='grid grid-cols-7 gap-x-1 gap-y-1.5 relative'>
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => (
                                <div key={w} className='z-10 h-4 mb-1 text-center w-7'>
                                    {w}
                                </div>
                            ))}
                            <div
                                className={
                                    'top-[1.625rem] right-0 ' + sharedCalendarRowClasses
                                }
                                style={{
                                    left: `calc(${
                                        7 - dayCountHead
                                    } * (2rem + 0.225rem))`,
                                }}
                            />
                            {range(dayCountFullRows).map((i) => (
                                <>
                                    <div
                                        className={
                                            'hidden sm:block left-0 right-0 ' +
                                            sharedCalendarRowClasses
                                        }
                                        style={{
                                            bottom: `calc(${
                                                i + (dayCountLast === 0 ? 0 : 1)
                                            } * (1.625rem))`,
                                        }}
                                    />
                                    <div
                                        className={
                                            'block sm:hidden left-0 right-0 ' +
                                            sharedCalendarRowClasses
                                        }
                                        style={{
                                            bottom: `calc(${
                                                i + (dayCountLast === 0 ? 0 : 1)
                                            } * (2.125rem))`,
                                        }}
                                    />
                                </>
                            ))}
                            <div
                                className={
                                    'bottom-0 left-0 ' + sharedCalendarRowClasses
                                }
                                style={{
                                    right: `calc(${
                                        7 - dayCountLast
                                    } * (2rem + 0.225rem))`,
                                }}
                            />
                            {range(dayCount).map((i) => (
                                <DayButton
                                    style={
                                        i === 0
                                            ? {gridColumnStart: skippedDays + 1}
                                            : {}
                                    }
                                    open={open}
                                    disabled={disabled}
                                    label={i + 1}
                                    dayIsSelected={
                                        date.getFullYear() === visibleYear &&
                                        date.getMonth() === visibleMonth &&
                                        date.getDate() === i + 1
                                    }
                                    onClick={() => {
                                        setDateTimestamp({
                                            year: visibleYear,
                                            month: visibleMonth,
                                            day: i + 1,
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'overflow-hidden z-40 px-[5px] ' +
                        'flex-row-center sm:flex-col ' +
                        'bg-gray-800 rounded shadow-sm no-selection ' +
                        (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                    }
                >
                    <div
                        className={
                            'p-2.5 text-sm text-gray-300 ' +
                            'grid gap-x-2 gap-y-2 ' +
                            'grid-flow-col grid-rows-2 sm:grid-rows-none ' +
                            'sm:grid-flow-row sm:grid-cols-2'
                        }
                    >
                        <div className='w-10 h-10 flex-row-center font-weight-600'>
                            H
                        </div>
                        <div className='w-10 h-10 flex-row-center font-weight-600'>
                            M
                        </div>
                        <div
                            className={
                                'bg-gray-700 rounded flex flex-row-reverse items-center justify-center sm:flex-col'
                            }
                        >
                            <button
                                className={
                                    'w-10 h-10 p-1.5 md:w-9 md:h-7 md:p-0.5 ' +
                                    'transform rotate-180 icon-white ' +
                                    'rounded ringable cursor-pointer ' +
                                    'focus:bg-gray-600'
                                }
                                onClick={() =>
                                    setHourTimestamp({
                                        hour: date.getHours() + 1,
                                    })
                                }
                                disabled={!open}
                            >
                                {icons.add}
                            </button>
                            <div className='h-6 my-0.5 text-base text-white font-weight-600 w-7 text-center'>
                                {date.getHours()}
                            </div>
                            <button
                                className={
                                    'w-10 h-10 p-1.5 md:w-9 md:h-7 md:p-0.5 ' +
                                    'transform icon-white focus:bg-gray-600 ' +
                                    'rounded ringable cursor-pointer'
                                }
                                onClick={() => {
                                    setHourTimestamp({
                                        hour: date.getHours() - 1,
                                    });
                                }}
                                disabled={!open}
                            >
                                {icons.remove}
                            </button>
                        </div>
                        <div
                            className={
                                'bg-gray-700 rounded flex flex-row-reverse items-center justify-center sm:flex-col'
                            }
                        >
                            <button
                                className={
                                    'w-10 h-10 p-1.5 md:w-9 md:h-7 md:p-0.5 ' +
                                    'transform rotate-180 icon-white ' +
                                    'rounded ringable cursor-pointer ' +
                                    'focus:bg-gray-600'
                                }
                                onClick={() =>
                                    setHourTimestamp({
                                        minute: date.getMinutes() + 1,
                                    })
                                }
                                disabled={!open}
                            >
                                {icons.add}
                            </button>
                            <div className='h-6 my-0.5 text-base text-white font-weight-600 w-7 text-center'>
                                {date.getMinutes()}
                            </div>
                            <button
                                className={
                                    'w-10 h-10 p-1.5 md:w-9 md:h-7 md:p-0.5 ' +
                                    'transform icon-white focus:bg-gray-600 ' +
                                    'rounded ringable cursor-pointer'
                                }
                                onClick={() => {
                                    setHourTimestamp({
                                        minute: date.getMinutes() - 1,
                                    });
                                }}
                                disabled={!open}
                                onKeyDown={(e) => {
                                    if (e.key === 'Tab' && !e.shiftKey) {
                                        setOpen(false);
                                    }
                                }}
                            >
                                {icons.remove}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualDatePicker;
