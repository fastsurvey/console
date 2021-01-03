import React from 'react';
import {icons} from 'assets';

interface Props {
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
const VisualDropDown = (props: Props) => (
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
                (props.isOpen ? 'ring ring-blue-300 shadow-lg ' : ' ')
            }
        >
            <div
                className={
                    'h-12 pl-3 pr-2 py-2 leading-8 ' +
                    'w-full flex flex-row ' +
                    'transition-colors duration-200 ' +
                    (props.isOpen
                        ? 'rounded-t bg-gray-200 text-gray-800 '
                        : 'rounded bg-gray-100 text-gray-600 ') +
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
                            'w-8 h-8 p-1 text-gray-500 ' +
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
                            'hover:bg-gray-100 bg-white ' +
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
