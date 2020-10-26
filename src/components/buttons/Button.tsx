import React from 'react';

interface ButtonProps {
    text: string;
    onClick?(): void;
    invisible?: boolean;
    className?: string;
    disabled?: boolean;
    spinning?: boolean;
}

function Button(props: ButtonProps) {
    const className = props.className === undefined ? '' : props.className;

    const reactivityClass =
        props.invisible || props.disabled
            ? 'cursor-default pointer-events-none'
            : 'cursor-pointer';

    const visibilityClass = props.invisible ? 'opacity-0' : '';

    const disabledClass = props.disabled
        ? 'text-gray-500 bg-gray-200'
        : 'shadow text-gray-900 bg-gray-100';

    return (
        <div
            tabIndex={0}
            className={
                'no-selection relative inline-block rounded ' +
                'h-10 px-6 py-1 leading-8 font-weight-600 ' +
                'text-lg ' +
                className +
                ' ' +
                reactivityClass +
                ' ' +
                visibilityClass +
                ' ' +
                disabledClass
            }
            onClick={props.onClick !== undefined ? props.onClick : () => {}}
        >
            <div
                className={
                    'transition-opacity duration-200 ' +
                    (props.spinning ? 'opacity-0' : 'opacity-100')
                }
            >
                {props.text}
            </div>
            <div
                className={
                    'pointer-events-none transition-opacity duration-200 ' +
                    (props.spinning ? 'opacity-100' : 'opacity-0')
                }
            >
                <div
                    className={
                        'absolute top-1/2 right-1/2 h-10 w-10 ' +
                        'transform translate-x-1/2 -translate-y-1/2'
                    }
                >
                    <div className='origin-top-left transform scale-50'>
                        <div className='lds-spinner'>
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Button;
