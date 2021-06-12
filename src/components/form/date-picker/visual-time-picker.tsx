import React, {useState, useRef} from 'react';
import {icons} from 'assets';
import {constants} from 'utilities';
import {range} from 'lodash';

export default function VisualTimePicker(props: {
    disabled: boolean;
    dateStore: Date;
    setHourTimestamp(t: {hour?: number; minute?: number}): void;
}) {
    const {dateStore: date, setHourTimestamp} = props;
    const [open, setOpen] = useState(true);
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <div className={' flex-col-left ' + (!open ? 'h-9 ' : ' ')}>
            <button
                ref={ref}
                className={
                    'px-3 w-full text-center rounded h-9 ringable font-weight-500 ' +
                    (open
                        ? 'text-gray-600 bg-gray-200 '
                        : 'text-gray-800 bg-gray-100')
                }
                onClick={() => setOpen(!open)}
            >
                {date.getHours().toString().padStart(2, '0')}:
                {date.getMinutes().toString().padStart(2, '0')}
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full centering-col px-[5px] ' +
                    'bg-gray-800 rounded shadow-sm no-selection ' +
                    (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                }
            >
                <div className='px-4 pb-2.5 text-sm text-gray-300 grid grid-cols-2 gap-x-1 gap-y-2'>
                    <div className='w-8 text-center'>Hour</div>
                    <div className='w-8 text-center'>Minute</div>
                </div>
            </div>
        </div>
    );
}
