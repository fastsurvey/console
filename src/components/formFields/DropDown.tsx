import React, {useState} from 'react';
import {ICONS} from '../../assets/icons/icons';

interface DropDownProps {
    options: {label: string; value: number}[];
    value: number;
    onChange(newValue: number): void;
    className?: string;
    onEnter?(): void;
    hideChevron?: boolean;
    disabled?: boolean;
}

const DropDown = React.forwardRef((props: DropDownProps, ref: any) => {
    const [isOpen, setOpen] = useState(false);
    const [zIndex, setZIndex] = useState('z-10');

    function handleKeyDown(e: any) {
        if (['Escape', 'Enter'].includes(e.key)) {
            close();
        }
    }

    function close() {
        document.removeEventListener('click', close);
        document.removeEventListener('keydown', handleKeyDown);
        setOpen(false);
        setTimeout(() => setZIndex('z-10'), 200);
    }

    function open() {
        if (!isOpen && !props.disabled) {
            document.addEventListener('click', close);
            document.addEventListener('keydown', handleKeyDown);
            setOpen(true);
            setZIndex('z-20');
        }
    }

    return (
        <div
            className={
                'relative w-full overflow-visible rounded h-12 ' +
                'font-weight-500 text-lg text-gray-800 no-selection ' +
                (props.className ? props.className : '') +
                zIndex
            }
        >
            <div
                className={
                    'flex flex-col bg-white rounded ' +
                    (props.hideChevron ? 'text-center ' : ' ') +
                    (isOpen
                        ? 'shadow-outline-gray-elevated '
                        : 'shadow-outline-gray ')
                }
            >
                <div
                    className={
                        'h-12 px-3 py-2 leading-8 ' +
                        'w-full flex flex-row rounded ' +
                        'transition-colors duration-200 ' +
                        (isOpen ? 'bg-gray-300 ' : ' ') +
                        (props.disabled
                            ? 'cursor-not-allowed bg-gray-200 '
                            : 'cursor-pointer ')
                    }
                    onClick={open}
                >
                    <div className='self-stretch flex-grow '>
                        {
                            props.options.filter(
                                (option) => option.value === props.value,
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
                        'w-full flex flex-col ' +
                        'transition-size duration-200 rounded-b ' +
                        (isOpen ? 'max-h-64 ' : 'max-h-0 ') +
                        'overflow-y-scroll'
                    }
                >
                    {props.options.map((option, index) => (
                        <div
                            key={option.value}
                            className={
                                'relative w-full h-12 px-3 py-2 ' +
                                'leading-8 cursor-pointer ' +
                                'hover:bg-gray-100 ' +
                                (option.value === props.value
                                    ? 'font-weight-700 '
                                    : 'font-weight-500 ')
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
