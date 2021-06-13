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
                    'w-full px-3 rounded h-9 ringable font-weight-500 ' +
                    (props.disabled
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                        : 'bg-gray-100 text-gray-800 ')
                }
                type={type ? type : 'text'}
                disabled={props.disabled === true}
            />
            {props.postfix && (
                <div
                    className={
                        'absolute top-0 leading-9 left-3 ' +
                        'text-gray-500 font-weight-500 ' +
                        'pointer-events-none'
                    }
                >
                    <span className='opacity-0'>{props.value}</span>
                    {props.postfix}
                </div>
            )}
        </div>
    );
}
