import React, {useState, useRef} from 'react';
import {icons} from 'assets';
import {constants} from 'utilities';
import {range} from 'lodash';

function VisualDatePicker(props: {
    disabled: boolean;
    dateStore: Date;
    getDaysInMonth(year: number, month: number): number;
    getFirstWeekday(year: number, month: number): number;
    setDateTimestamp(t: {year: number; month: number; day: number}): void;
}) {
    const {dateStore: date, setDateTimestamp, disabled} = props;

    const [open, setOpen] = useState(false);
    const [visibleMonth, setVisibleMonth] = useState(date.getMonth());
    const [visibleYear, setVisibleYear] = useState(date.getFullYear());

    const ref = useRef<HTMLButtonElement>(null);

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
    function colSpan(n: number) {
        return {
            display: 'grid',
            gridColumn: `span ${n} / span ${n}`,
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        };
    }

    function DayButton(props: {day: number}) {
        const selectedDay =
            date.getFullYear() === visibleYear &&
            date.getMonth() === visibleMonth &&
            date.getDate() === props.day;

        return (
            <button
                className={
                    'w-6 -mx-0.5 px-0.5 text-center rounded-sm ringable ' +
                    (selectedDay
                        ? 'bg-red-500 text-red-50 z-0 font-weight-600 '
                        : 'hover:text-white z-10 font-weight-500 ')
                }
                onClick={() => {
                    if (open && !disabled) {
                        setDateTimestamp({
                            year: visibleYear,
                            month: visibleMonth,
                            day: props.day,
                        });
                        setOpen(false);
                        ref.current?.focus();
                    }
                }}
                onKeyDown={(e) => {
                    if (
                        e.key === 'Tab' &&
                        props.day === dayCount &&
                        !e.shiftKey
                    ) {
                        setOpen(false);
                    }
                }}
                disabled={!open}
            >
                {props.day}
            </button>
        );
    }

    // how many days in the first row?
    const dayCount1 = 7 - skippedDays;

    // how many days in the fully filled rows?
    const dayCount2 = Math.floor((dayCount - dayCount1) / 7) * 7;

    // how many days in the last not-filled row?
    const dayCount3 = dayCount - dayCount1 - dayCount2;

    const dayRows = [
        <div className='grid w-full grid-cols-7 gap-x-2'>
            {range(skippedDays).map((i) => (
                <div className='w-5 text-center' />
            ))}
            <div
                style={colSpan(dayCount1)}
                className='px-0.5 -mx-0.5 bg-gray-700 rounded-sm gap-x-2'
            >
                {range(dayCount1).map((i) => (
                    <DayButton day={i + 1} />
                ))}
            </div>
        </div>,
        ...range(dayCount2 / 7).map((i) => (
            <div
                className='grid grid-cols-7 px-0.5 -mx-0.5 bg-gray-700 rounded-sm gap-x-2'
                style={{width: 'calc(100% + 0.25rem'}}
            >
                {range(7).map((j) => (
                    <DayButton day={dayCount1 + i * 7 + j + 1} />
                ))}
            </div>
        )),
        dayCount3 > 0 && (
            <div
                style={colSpan(dayCount3)}
                className='px-0.5 -mx-0.5 bg-gray-700 rounded-sm gap-x-2'
            >
                {range(dayCount3).map((i) => (
                    <DayButton day={dayCount1 + dayCount2 + i + 1} />
                ))}
            </div>
        ),
    ];

    return (
        <div className={' flex-col-left ' + (!open ? 'h-9 ' : ' ')}>
            <button
                ref={ref}
                className={
                    'px-1 w-full flex-row-left rounded h-9 ringable font-weight-500 ' +
                    (open
                        ? 'text-gray-600 bg-gray-200 '
                        : 'text-gray-800 bg-gray-100')
                }
                onClick={() => setOpen(!open)}
            >
                <div className='p-1 w-7 h-7 icon-gray'>{icons.calendar}</div>
                <div className='px-1'>
                    {date.getDate().toString().padStart(2, '0')}.
                    {(date.getMonth() + 1).toString().padStart(2, '0')}.
                    {date.getFullYear().toString().padStart(2, '0')}
                </div>
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full centering-col px-[5px] ' +
                    'bg-gray-800 rounded shadow-sm no-selection ' +
                    (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                }
            >
                <div className='mb-1.5 centering-row'>
                    <button
                        className={
                            'w-7 h-7 p-0.5 transform rotate-90 icon-light-gray ' +
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
                            'w-7 h-7 p-0.5 transform -rotate-90 icon-light-gray ' +
                            'rounded ringable cursor-pointer'
                        }
                        onClick={nextMonth}
                        disabled={!open}
                    >
                        {icons.chevronDown}
                    </button>
                </div>
                <div className='px-4 pb-2.5 text-sm text-gray-300 flex-col-left gap-y-2'>
                    <div className='grid grid-cols-7 gap-x-2'>
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => (
                            <div className='w-5 text-center'>{w}</div>
                        ))}
                    </div>
                    {dayRows.map((m) => m)}
                </div>
            </div>
        </div>
    );
}

export default VisualDatePicker;
