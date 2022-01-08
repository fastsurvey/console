import React, {useState, useRef, useEffect} from 'react';
import {icons} from '/src/assets';

export default function DropDown(props: {
    options: {label: string; value: number}[];
    value: number;
    setValue(v: number): void;
    disabled?: boolean;
}) {
    const {options, value, setValue, disabled} = props;
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);

    const label = options.filter((o) => o.value === value)[0]?.label;
    useEffect(() => {
        if (props.disabled) {
            setOpen(false);
        }
    }, [props.disabled]);

    return (
        <div className={'relative w-full flex-col-center z-50'}>
            <button
                ref={ref}
                onClick={props.disabled ? () => {} : () => setOpen(!open)}
                className={
                    'w-full px-3 h-9 text-left relative rounded ' +
                    'font-weight-500 z-50 ringable ' +
                    (open || props.disabled
                        ? 'bg-gray-200 text-gray-600 '
                        : 'bg-gray-100 text-gray-800 ') +
                    (props.disabled ? 'cursor-not-allowed ' : '')
                }
                disabled={disabled === true}
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
                    >
                        <div className='w-7 h-7 p-1.5 icon-blue'>
                            {option.value === value ? icons.checkCircle : ''}
                        </div>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
