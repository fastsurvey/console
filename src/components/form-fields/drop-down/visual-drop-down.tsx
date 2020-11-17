import React from 'react';
import {icons} from 'assets';

interface VisualDropDownProps {
    activeOption: {label: string; value: number};
    options: {label: string; value: number}[];

    className?: string;
    hideChevron?: boolean;
    disabled?: boolean;

    isOpen: boolean;
    zIndex: string;
    open(): void;
    onChange(newValue: number): void;
}

const VisualDropDown = (props: VisualDropDownProps) => (
    <div
        className={
            `relative w-full overflow-visible rounded h-12 ${props.zIndex} ` +
            'font-weight-500 text-lg text-gray-800 no-selection ' +
            (props.className ? props.className : '')
        }
    >
        <div
            className={
                'flex flex-col bg-white rounded ' +
                (props.hideChevron ? 'text-center ' : ' ') +
                (props.isOpen
                    ? 'shadow-outline-gray-elevated '
                    : 'shadow-outline-gray ')
            }
        >
            <div
                className={
                    'h-12 px-3 py-2 leading-8 ' +
                    'w-full flex flex-row ' +
                    'transition-colors duration-200 ' +
                    (props.isOpen ? 'bg-gray-300 ' : ' ') +
                    (props.disabled
                        ? 'cursor-not-allowed bg-gray-200 rounded '
                        : 'cursor-pointer ')
                }
                onClick={props.open}
            >
                <div className='self-stretch flex-grow '>
                    {props.activeOption.label}
                </div>
                {!props.hideChevron && (
                    <div
                        className={
                            'w-8 h-8 text-gray-500 ' +
                            'transition-transform duration-200 transform ' +
                            (props.isOpen ? 'rotate-180 ' : 'rotate-0 ')
                        }
                    >
                        {icons.expand_more}
                    </div>
                )}
            </div>
            <div
                className={
                    'w-full flex flex-col ' +
                    'transition-size duration-200 rounded-b ' +
                    (props.isOpen ? 'max-h-64 ' : 'max-h-0 ') +
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
                            (option.value === props.activeOption.value
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

export default VisualDropDown;
