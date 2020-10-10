import React from 'react';

interface ButtonComponentProps {
    text: string;
    onClick?(): void;
    visible?: boolean;
    className?: string;
}

function ButtonComponent(props: ButtonComponentProps) {
    const className = props.className === undefined ? '' : props.className;

    const visibilityClass =
        props.visible === false
            ? 'cursor-default opacity-0 pointer-events-none'
            : 'cursor-pointer';

    return (
        <div
            className={
                'no-selection relative inline-block rounded ' +
                'shadow h-10 px-6 py-1 leading-8 font-weight-600 ' +
                'bg-gray-100 text-gray-900 text-lg ' +
                className +
                ' ' +
                visibilityClass
            }
            onClick={props.onClick !== undefined ? props.onClick : () => {}}
        >
            {props.text}
        </div>
    );
}

export default ButtonComponent;
