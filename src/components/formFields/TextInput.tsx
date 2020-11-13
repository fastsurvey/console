import React, {useState} from 'react';

interface TextInputProps {
    value: string;
    onChange(newValue: string): void;
    type?: string;
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
    required?: boolean;
    hint?: {text: string; fulfilled: boolean};
    autoComplete?: string;
    onEnter?(): void;
    flat?: boolean;
}

const TextInput = React.forwardRef((props: TextInputProps, ref: any) => {
    const placeholder =
        props.placeholder !== undefined ? props.placeholder : '';

    const [focused, setFocus] = useState(false);

    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            if (props.onEnter !== undefined) {
                props.onEnter();
            }
        } else if (e.key === 'Escape' || e.key === 'Tab') {
            e.target.blur();
        }
    }

    return (
        <div
            className={
                'relative ' +
                (props.wrapperClassName ? props.wrapperClassName : '')
            }
        >
            <input
                ref={ref}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={
                    'font-weight-500 text-lg  text-gray-800 no-selection ' +
                    'border-0 rounded w-full h-12 ' +
                    'py-2 pl-3 pr-10 md:pr-12 ' +
                    (props.flat
                        ? 'shadow-outline-gray bg-white transition duration-150 '
                        : 'shadow ') +
                    'focus:outline-none focus:shadow-outline ' +
                    (props.className ? props.className : '')
                }
                type={props.type ? props.type : 'text'}
                autoComplete={props.autoComplete ? props.autoComplete : ''}
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
});

export default TextInput;
