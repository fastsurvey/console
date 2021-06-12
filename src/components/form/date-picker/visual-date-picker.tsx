import React, {useState} from 'react';

interface Props {
    disabled: boolean;
    dateStore: Date;
    getDaysInMonth(year: number, month: number): number;
    getFirstWeekday(year: number, month: number): number;
    setDateTimestamp(t: {year: number; month: number; day: number}): void;
    setHourTimestamp(t: {hour?: number; minute?: number}): void;
}
function VisualDatePicker(props: Props) {
    const [open, setOpen] = useState(false);

    const {dateStore: date} = props;

    return (
        <div
            className={
                'w-full centering-col ' + (!open ? 'overflow-hidden h-9 ' : ' ')
            }
        >
            <button
                className={
                    'w-full px-3 text-left rounded h-9 ' +
                    'text-gray-800 bg-gray-100 font-weight-500'
                }
            >
                {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
            </button>
        </div>
    );
}

export default VisualDatePicker;
