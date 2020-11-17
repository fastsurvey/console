import React from 'react';

interface ButtonProps {
    text: string;
    onClick?(): void;
    invisible?: boolean;
    className?: string;
    disabled?: boolean;
    spinning?: boolean;
    icon?: React.ReactNode;
}

function Button(props: ButtonProps) {
    const reactivityClass =
        props.invisible || props.disabled || props.spinning
            ? 'cursor-default pointer-events-none'
            : 'cursor-pointer';

    const visibilityClass = props.invisible ? 'opacity-0' : '';

    const disabledClass =
        props.disabled || props.spinning
            ? 'text-gray-500 bg-gray-200'
            : 'shadow text-gray-900 bg-gray-100';

    return (
        <div
            tabIndex={0}
            className={
                'no-selection relative inline-block rounded ' +
                'h-10 px-2 py-1 leading-8 font-weight-600 ' +
                'text-lg transition duration-200 outline-none ' +
                `${reactivityClass} ${visibilityClass} ${disabledClass} ` +
                (props.className ? props.className : '')
            }
            onClick={!props.disabled ? props.onClick : undefined}
        >
            <div
                className={
                    'flex flex-row transition-opacity duration-200 ' +
                    (props.spinning ? 'opacity-0' : 'opacity-100')
                }
            >
                {props.icon && <div className='w-6 h-8 py-1'>{props.icon}</div>}
                <div className='px-2'>{props.text}</div>
            </div>
            <div
                className={
                    'pointer-events-none transition-opacity duration-200 ' +
                    (props.spinning ? 'opacity-100' : 'opacity-0')
                }
            >
                <div
                    className={
                        'absolute top-1/2 left-1/2 h-10 w-10 ' +
                        'transform -translate-x-1/2 -translate-y-1/2'
                    }
                >
                    <div className='origin-top-left transform scale-50'>
                        <div className='lds-spinner'>
                            {[...Array(12).keys()].map(() => (
                                <div />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Button;
