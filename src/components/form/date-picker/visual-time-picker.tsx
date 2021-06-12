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
                    'px-3 w-full centering-row rounded h-9 ringable font-weight-500 ' +
                    (open
                        ? 'text-gray-600 bg-gray-200 '
                        : 'text-gray-800 bg-gray-100')
                }
                onClick={() => setOpen(!open)}
            >
                <div className='flex-shrink-0 w-6 text-center'>
                    {date.getHours().toString().padStart(2, '0')}
                </div>
                :
                <div className='flex-shrink-0 w-6 text-center'>
                    {date.getMinutes().toString().padStart(2, '0')}
                </div>
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full centering-col px-[5px] ' +
                    'bg-gray-800 rounded shadow-sm no-selection ' +
                    (open ? 'py-[5px] mt-2 ' : 'h-0 py-0 mt-0 ')
                }
            >
                <div className='p-2.5 text-sm text-gray-300 grid grid-cols-2 gap-x-2 gap-y-2'>
                    <div className='w-8 text-center'>H</div>
                    <div className='w-8 text-center'>M</div>
                    <div className='bg-gray-700 rounded centering-col'>
                        <button
                            className={
                                'w-7 h-7 p-0.5 transform rotate-180 icon-light-gray ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={() =>
                                setHourTimestamp({
                                    hour: date.getHours() + 1,
                                })
                            }
                            disabled={!open}
                        >
                            {icons.chevronDown}
                        </button>
                        <div className='h-6 my-0.5 text-base text-white font-weight-600'>
                            {date.getHours()}
                        </div>
                        <button
                            className={
                                'w-7 h-7 p-0.5 transform icon-light-gray ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={() => {
                                setHourTimestamp({
                                    hour: date.getHours() - 1,
                                });
                            }}
                            disabled={!open}
                        >
                            {icons.chevronDown}
                        </button>
                    </div>
                    <div className='bg-gray-700 rounded centering-col'>
                        <button
                            className={
                                'w-7 h-7 p-0.5 transform rotate-180 icon-light-gray ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={() =>
                                setHourTimestamp({
                                    minute: date.getMinutes() + 1,
                                })
                            }
                            disabled={!open}
                        >
                            {icons.chevronDown}
                        </button>
                        <div className='h-6 my-0.5 text-base text-white font-weight-600'>
                            {date.getMinutes()}
                        </div>
                        <button
                            className={
                                'w-7 h-7 p-0.5 transform icon-light-gray ' +
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
                            {icons.chevronDown}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
