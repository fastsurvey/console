import React from 'react';

export default function TextInput(props: {
    value: string;
    setValue(v: string): void;
    placeholder?: string;
    autoComplete?: string;
    type?: 'text' | 'password';
}) {
    const {value, setValue, placeholder, autoComplete, type} = props;

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
            className='w-full px-3 bg-gray-100 rounded h-9 ringable '
            placeholder={placeholder ? placeholder : ''}
            autoComplete={autoComplete ? autoComplete : ''}
            type={type ? type : 'text'}
        />
    );
}
