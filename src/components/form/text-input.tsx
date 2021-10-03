import React, {useState} from 'react';
import {icons} from '@assets';

export default function TextInput(props: {
    value: string;
    setValue(v: string): void;
    autoFocus?: boolean;
    type?: 'text' | 'password';
    disabled?: boolean;
    postfix?: string;
    autoComplete?: string;
}) {
    const {value, setValue, autoFocus, type, disabled, postfix} = props;
    const [plainText, setPlainText] = useState(type !== 'password');

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
                    (disabled
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                        : 'bg-gray-100 text-gray-800 ')
                }
                type={plainText ? 'text' : 'password'}
                disabled={disabled === true}
                autoComplete={props.autoComplete}
            />
            {postfix && (
                <div
                    className={
                        'absolute top-0 leading-9 left-3 ' +
                        'text-gray-500 font-weight-500 ' +
                        'pointer-events-none'
                    }
                >
                    <span className='opacity-0'>{value}</span>
                    {postfix}
                </div>
            )}
            {type === 'password' && (
                <button
                    className={
                        'absolute top-0 h-6 w-6 p-1 m-1.5 right-0 icon-dark-gray ringable rounded'
                    }
                    onClick={() => setPlainText(!plainText)}
                >
                    {plainText ? icons.viewHidden : icons.viewVisible}
                </button>
            )}
        </div>
    );
}
