import React, {useState} from 'react';
import {icons} from 'assets';
import {constants} from 'utilities';
import {range} from 'lodash';

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
                <div className='grid grid-cols-7 px-4 text-sm text-gray-200 gap-x-2 gap-y-2'>
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => (
                        <div className='w-4 text-center'>{w}</div>
                    ))}
                    <div
                        style={{
                            gridColumn: `span ${skippedDays} / span ${skippedDays}`,
                        }}
                    />
                    {range(props.getDaysInMonth(visibleYear, visibleMonth)).map(
                        (i) => (
                            <div className='w-4 text-center'>{i + 1}</div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisualDatePicker;
