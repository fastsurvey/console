import React from 'react';

interface InputComponentProps {
    value: string;
    onChange(newValue: string): void;
    type?: string;
    placeholder?: string;
    className?: string;
}

function InputComponent(props: InputComponentProps) {
    return (
        <input
            placeholder={
                props.placeholder != undefined ? props.placeholder : ''
            }
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className={
                'font-weight-500 text-lg md:no-selection ' +
                'drop-shadow md:shadow border-0 rounded w-full h-12 ' +
                'py-2 pl-3 pr-10 md:pr-12 text-gray-700 ' +
                'focus:outline-none focus:shadow-outline ' +
                (props.className != undefined ? props.className : '')
            }
            type={props.type != undefined ? props.type : 'text'}
        />
    );
}

export default InputComponent;
