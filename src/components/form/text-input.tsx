import React from 'react';

export default function TextInput(props: {
    value: string;
    setValue(v: string): void;
    placeholder?: string;
    autoFocus?: boolean;
    type?: 'text' | 'password';
}) {
    const {value, setValue, placeholder, autoFocus, type} = props;

    function handleKeydown(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            // @ts-ignore
            e.target.blur();
        }
    }

    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeydown}
            autoFocus={autoFocus === true}
            className='w-full px-3 bg-gray-100 rounded h-9 ringable font-weight-500 '
            placeholder={placeholder ? placeholder : ''}
            type={type ? type : 'text'}
        />
    );
}
