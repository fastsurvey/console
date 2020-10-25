import React, {useState} from 'react';

interface TextInputProps {
    value: string;
    onChange(newValue: string): void;
    type?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    hint?: {text: string; fulfilled: boolean};
}

function TextInput(props: TextInputProps) {
    const placeholder =
        props.placeholder !== undefined ? props.placeholder : '';

    const [focused, setFocus] = useState(false);

    return (
        <div className='relative mb-2'>
            <input
                placeholder={placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={
                    'font-weight-500 text-lg md:no-selection ' +
                    'drop-shadow md:shadow border-0 rounded w-full h-12 ' +
                    'py-2 pl-3 pr-10 md:pr-12 text-gray-700 ' +
                    'focus:outline-none focus:shadow-outline ' +
                    (props.className !== undefined ? props.className : '')
                }
                type={props.type !== undefined ? props.type : 'text'}
            />
            {props.hint && (
                <div
                    className={
                        'absolute top-0 right-0 w-2 h-2 mt-5 mr-2 rounded-full ' +
                        (props.hint.fulfilled ? 'bg-green-500' : 'bg-magenta')
                    }
                />
            )}
            {props.hint && (
                <div
                    className={
                        'relative z-50 w-full px-1 leading-6 ' +
                        'overflow-hidden font-weight-600 ' +
                        (props.hint.fulfilled
                            ? 'text-green-500'
                            : 'text-magenta') +
                        ' transition-all duration-300 ' +
                        (focused ? 'h-8 py-1 mb-2' : 'h-0 py-0 mb-0')
                    }
                >
                    {props.hint.text}
                </div>
            )}
        </div>
    );
}

export default TextInput;
