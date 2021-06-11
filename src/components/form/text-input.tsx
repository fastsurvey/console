import React from 'react';

export default function TextInput(props: {
    value: string;
    setValue(v: string): void;
    autoFocus?: boolean;
    type?: 'text' | 'password';
    disabled?: boolean;
    postfix?: string;
}) {
    const {value, setValue, autoFocus, type} = props;

    function handleKeydown(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            // @ts-ignore
            e.target.blur();
        }
    }

    return (
        <div className='relative w-full '>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeydown}
                autoFocus={autoFocus === true}
                className={
                    'w-full px-3 rounded h-9 ringable ' +
                    'text-gray-800 bg-gray-100 font-weight-500'
                }
                type={type ? type : 'text'}
                disabled={props.disabled === true}
            />
            {props.postfix && (
                <div
                    className={
                        'absolute top-0 leading-9 left-3 ' +
                        'text-gray-500 font-weight-500'
                    }
                >
                    <span className='opacity-0'>{props.value}</span>
                    {props.postfix}
                </div>
            )}
        </div>
    );
}
