import React, {useState} from 'react';
import {ICONS} from '../../assets/icons/icons';

interface DropDownProps {
    options: {label: string; value: number}[];
    value: number;
    onChange(newValue: number): void;
    className?: string;
    onEnter?(): void;
    hideChevron?: boolean;
}

const DropDown = React.forwardRef((props: DropDownProps, ref: any) => {
    const [isOpen, setOpen] = useState(false);

    function handleKeyDown(e: any) {
        if (['Escape', 'Enter'].includes(e.key)) {
            setOpen(false);
        }
    }

    function close() {
        document.removeEventListener('click', close);
        setOpen(false);
    }

    function open() {
        if (!isOpen) {
            document.addEventListener('click', close);
            setOpen(true);
        }
    }

    return (
        <div
            className={
                'relative w-full overflow-visible rounded h-12 no-selection ' +
                (props.className ? props.className : '')
            }
        >
            <div
                className={
                    'flex flex-col shadow-outline-gray bg-white rounded ' +
                    (props.hideChevron ? 'text-center ' : '')
                }
            >
                <div
                    className={
                        'z-20 h-12 px-3 py-2 text-xl font-weight-600 ' +
                        'w-full flex flex-row cursor-pointer ' +
                        'transition-colors duration-200 ' +
                        (isOpen ? 'bg-gray-300 ' : 'bg-transparent ')
                    }
                    onClick={open}
                >
                    <div className='self-stretch flex-grow '>
                        {
                            props.options.filter(
                                (option) => option.value == props.value,
                            )[0].label
                        }
                    </div>
                    {!props.hideChevron && (
                        <div
                            className={
                                'w-8 h-8 text-gray-500 ' +
                                'transition-transform duration-200 transform ' +
                                (isOpen ? 'rotate-180 ' : 'rotate-0 ')
                            }
                        >
                            {ICONS.expand_more}
                        </div>
                    )}
                </div>
                <div
                    className={
                        'z-10 w-full flex flex-col ' +
                        'transition-size duration-200 rounded-b ' +
                        (isOpen ? 'max-h-64 ' : 'max-h-0 ') +
                        'overflow-y-scroll'
                    }
                >
                    {props.options.map((option, index) => (
                        <div
                            className={
                                'relative w-full h-12 px-3 py-2 text-xl ' +
                                'leading-8 cursor-pointer ' +
                                'hover:bg-gray-100 ' +
                                (option.value === props.value
                                    ? 'font-weight-600 '
                                    : 'font-weight-400 ')
                            }
                            onClick={() => props.onChange(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default DropDown;
