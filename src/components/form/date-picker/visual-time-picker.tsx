import React, {useState, useRef, useEffect} from 'react';
import {icons} from '/src/assets';

export default function VisualTimePicker(props: {
    disabled: boolean;
    dateStore: Date;
    setHourTimestamp(t: {hour?: number; minute?: number}): void;
    'data-cy'?: string;
}) {
    const {dateStore: date, setHourTimestamp} = props;
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (props.disabled) {
            setOpen(false);
        }
    }, [props.disabled]);

    return (
        <div
            className={' flex-col-left ' + (!open ? 'h-9 ' : ' ')}
            data-cy={props['data-cy']}
        >
            <button
                ref={ref}
                className={
                    'px-1 w-full flex-row-left rounded h-9 ringable font-weight-500 ' +
                    (open || props.disabled
                        ? 'bg-gray-200 text-gray-600 '
                        : 'bg-gray-100 text-gray-800 ') +
                    (props.disabled ? 'cursor-not-allowed ' : '')
                }
                onClick={() => setOpen(!open)}
                disabled={props.disabled}
            >
                <div className='p-1 w-7 h-7 icon-dark-gray'>{icons.time}</div>
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
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform rotate-180 icon-white ' +
                                'rounded ringable cursor-pointer'
                            }
                            onClick={() =>
                                setHourTimestamp({
                                    hour: date.getHours() + 1,
                                })
                            }
                            disabled={!open}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab' && e.shiftKey) {
                                    setOpen(false);
                                }
                            }}
                        >
                            {icons.chevronDown}
                        </button>
                        <div className='h-6 my-0.5 text-base text-white font-weight-600'>
                            {date.getHours()}
                        </div>
                        <button
                            className={
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform icon-white ' +
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
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform rotate-180 icon-white ' +
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
                                'w-10 h-10 p-1.5 md:w-7 md:h-7 md:p-0.5 ' +
                                'transform icon-white ' +
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
