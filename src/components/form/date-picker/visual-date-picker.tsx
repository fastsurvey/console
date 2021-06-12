import React, {useState} from 'react';
import {icons} from 'assets';
import {constants} from 'utilities';
import {last, range} from 'lodash';

interface Props {
    disabled: boolean;
    dateStore: Date;
    getDaysInMonth(year: number, month: number): number;
    getFirstWeekday(year: number, month: number): number;
    setDateTimestamp(t: {year: number; month: number; day: number}): void;
    setHourTimestamp(t: {hour?: number; minute?: number}): void;
}
function VisualDatePicker(props: Props) {
    const {dateStore: date} = props;

    const [open, setOpen] = useState(true);
    const [visibleMonth, setVisibleMonth] = useState(date.getMonth());
    const [visibleYear, setVisibleYear] = useState(date.getFullYear());

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

    // how many days in the first row?
    const dayCount1 = 7 - skippedDays;

    // how many days in the fully filled rows?
    const dayCount2 = Math.floor((dayCount - dayCount1) / 7) * 7;

    // how many days in the last not-filled row?
    const dayCount3 = dayCount - dayCount1 - dayCount2;

    console.log(dayCount, dayCount1, dayCount2, dayCount3);

    const dayRows = [
        <div className='grid w-full grid-cols-7 gap-x-2'>
            {range(skippedDays).map((i) => (
                <div className='w-4 text-center' />
            ))}
            <div
                style={colSpan(dayCount1)}
                className='px-1 -mx-1 bg-gray-700 rounded-sm gap-x-2'
            >
                {range(dayCount1).map((i) => (
                    <div className='w-4 text-center font-weight-600 '>
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>,
        ...range(dayCount2 / 7).map((i) => (
            <div
                className='grid grid-cols-7 px-1 -mx-1 bg-gray-700 rounded-sm gap-x-2'
                style={{width: 'calc(100% + 0.5rem'}}
            >
                {range(7).map((j) => (
                    <div className='w-4 text-center font-weight-600 '>
                        {dayCount1 + i * 7 + j + 1}
                    </div>
                ))}
            </div>
        )),
        dayCount3 > 0 && (
            <div
                style={colSpan(dayCount3)}
                className='px-1 -mx-1 bg-gray-700 rounded-sm gap-x-2'
            >
                {range(dayCount3).map((i) => (
                    <div className='w-4 text-center font-weight-600 '>
                        {dayCount1 + dayCount2 + i + 1}
                    </div>
                ))}
            </div>
        ),
    ];

    return (
        <div className={' flex-col-left ' + (!open ? 'h-9 ' : ' ')}>
            <button
                className={
                    'px-3 w-full text-center rounded h-9 ringable font-weight-500 ' +
                    (open
                        ? 'text-gray-600 bg-gray-200 '
                        : 'text-gray-800 bg-gray-100')
                }
                onClick={() => setOpen(!open)}
            >
                {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full centering-col px-[5px] ' +
                    'bg-gray-800 rounded shadow-sm no-selection ' +
                    (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                }
            >
                <div className='mb-1.5 centering-row'>
                    <div
                        className='w-8 h-8 p-1 transform rotate-90 cursor-pointer icon-light-gray'
                        onClick={prevMonth}
                    >
                        {icons.chevronDown}
                    </div>
                    <div className='text-white w-22 centering-row'>
                        <div className='flex-shrink-0 w-10 text-center'>
                            {constants.formOptions.MONTHS[visibleMonth]}
                        </div>
                        <div className='flex-shrink-0 w-10 text-center'>
                            {visibleYear}
                        </div>
                    </div>
                    <div
                        className='w-8 h-8 p-1 transform -rotate-90 cursor-pointer icon-light-gray'
                        onClick={nextMonth}
                    >
                        {icons.chevronDown}
                    </div>
                </div>
                <div className='px-4 pb-2.5 text-sm text-gray-300 flex-col-left gap-y-2'>
                    <div className='grid grid-cols-7 gap-x-2'>
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => (
                            <div className='w-4 text-center'>{w}</div>
                        ))}
                    </div>
                    {dayRows.map((m) => m)}
                </div>
            </div>
        </div>
    );
}

export default VisualDatePicker;
