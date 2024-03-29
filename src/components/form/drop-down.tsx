import React, {useState, useRef, useEffect} from 'react';
import {icons} from '/src/assets';

export default function DropDown(props: {
    options: {label: string; value: number}[];
    value: number;
    setValue(v: number): void;
    disabled?: boolean;
    'data-cy'?: string;
}) {
    const {options, value, setValue, disabled} = props;
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    const label = options.filter((o) => o.value === value)[0]?.label;
    useEffect(() => {
        if (disabled) {
            setOpen(false);
        }
    }, [disabled]);

    return (
        <div
            className={'relative w-full flex-col-center z-50'}
            data-cy={`${props['data-cy']} ${open ? 'isopen' : 'isnotopen'}`}
        >
            <button
                ref={ref}
                onClick={disabled ? () => {} : () => setOpen(!open)}
                className={
                    'w-full px-3 h-9 text-left relative rounded ' +
                    'font-weight-500 z-50 ringable ' +
                    (open || disabled
                        ? 'bg-gray-200 text-gray-600 '
                        : 'bg-gray-100 text-gray-800 ') +
                    (disabled ? 'cursor-not-allowed ' : '')
                }
                disabled={disabled}
                data-cy='button-toggle'
            >
                {label}
                <div
                    className={
                        'absolute top-0 right-0 p-1.5 h-9 w-9 svg-dropdown-chevron ' +
                        'transform transition-transform duration-150 ' +
                        (open ? 'rotate-180 ' : 'rotate-0 ')
                    }
                >
                    {icons.chevronDown}
                </div>
            </button>
            <div
                className={
                    'overflow-hidden z-40 w-full flex-col-center px-[5px] ' +
                    'bg-gray-800 rounded shadow-sm ' +
                    (open ? 'max-h-32 py-[5px] mt-2 ' : 'max-h-0 py-0 mt-0 ')
                }
            >
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setValue(option.value);
                            setOpen(false);
                            ref.current?.focus();
                        }}
                        disabled={!open}
                        className={
                            'w-full h-7 my-0.5 text-sm text-left rounded-sm ' +
                            'font-weight-500 text-gray-400 ringable ' +
                            'hover:text-white focus:text-white ' +
                            'flex-row-left '
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Tab') {
                                if (
                                    (index === 0 && e.shiftKey) ||
                                    (index === options.length - 1 && !e.shiftKey)
                                )
                                    setOpen(false);
                            }
                        }}
                        data-cy={`button-option-${index} ${
                            option.value === value ? 'isselected' : 'isnotselected'
                        }`}
                    >
                        <div className='w-5 h-5 p-1.5 svg-dropdown-select'>
                            {option.value === value && icons.circle}
                        </div>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
