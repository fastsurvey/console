import React, {useState} from 'react';
import {icons} from 'assets';

export default function DropDown(props: {
    options: {label: string; value: number}[];
    value: number;
    setValue(v: number): void;
    disabled?: boolean;
}) {
    const {options, value, setValue, disabled} = props;
    const [open, setOpen] = useState(false);

    const label = options.filter((o) => o.value === value)[0]?.label;

    return (
        <div className={'relative w-full centering-col z-50'}>
            <button
                onClick={() => setOpen(!open)}
                className={
                    'w-full px-3 h-9 text-left relative rounded ' +
                    'font-weight-500 text-gray-800 z-50 ringable ' +
                    (open ? 'bg-gray-200 ' : 'bg-gray-100 ')
                }
            >
                {label}
                <div
                    className={
                        'absolute top-0 right-0 p-1.5 h-9 w-9 icon-gray ' +
                        'transform transition-transform duration-150 ' +
                        (open ? 'rotate-180 ' : 'rotate-0 ')
                    }
                >
                    {icons.chevronDown}
                </div>
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full centering-col px-[5px] ' +
                    'bg-gray-100 rounded ' +
                    (open ? 'max-h-32 py-[5px] mt-2 ' : 'max-h-0 py-0 mt-0 ')
                }
            >
                {options.map((option, index) => (
                    <button
                        onClick={() => {
                            setValue(option.value);
                            setOpen(false);
                        }}
                        disabled={props.disabled || !open}
                        className={
                            'w-full px-2 h-8 text-sm text-left rounded-sm ' +
                            'font-weight-500 text-gray-700 ringable ' +
                            'hover:text-black focus:text-black '
                        }
                        onKeyDown={(e) => {
                            if (
                                index === options.length - 1 &&
                                e.key === 'Tab' &&
                                !e.shiftKey
                            ) {
                                setOpen(false);
                            }
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
