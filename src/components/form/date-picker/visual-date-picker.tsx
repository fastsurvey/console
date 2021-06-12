import React, {useState} from 'react';
import {icons} from 'assets';
import {constants} from 'utilities';

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

    const [open, setOpen] = useState(false);
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

    return (
        <div className={' flex-col-left ' + (!open ? 'h-9 ' : ' ')}>
            <button
                className={
                    'px-3 w-full text-left rounded h-9 ringable font-weight-500 ' +
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
                    (open ? 'max-h-32 py-[5px] mt-2 ' : 'max-h-0 py-0 mt-0 ')
                }
            >
                <div className='centering-row'>
                    <div
                        className='w-8 h-8 p-1 transform rotate-90 cursor-pointer icon-light-gray'
                        onClick={prevMonth}
                    >
                        {icons.chevronDown}
                    </div>
                    <div className='text-white w-22 centering-row'>
                        <div className='flex-shrink-0 w-9'>
                            {constants.formOptions.MONTHS[visibleMonth]}
                        </div>
                        <div className='flex-shrink-0 w-10'>{visibleYear}</div>
                    </div>
                    <div
                        className='w-8 h-8 p-1 transform -rotate-90 cursor-pointer icon-light-gray'
                        onClick={nextMonth}
                    >
                        {icons.chevronDown}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualDatePicker;
