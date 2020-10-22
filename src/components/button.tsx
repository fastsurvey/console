import React from 'react';

interface ButtonComponentProps {
    text: string;
    onClick?(): void;
    invisible?: boolean;
    className?: string;
    disabled?: boolean;
}

function ButtonComponent(props: ButtonComponentProps) {
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
            {props.text}
        </div>
    );
}

export default ButtonComponent;
