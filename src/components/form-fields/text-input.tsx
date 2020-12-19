import React, {useState} from 'react';

interface Props {
    value: string;
    onChange(newValue: string): void;
    type?: string;
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
    required?: boolean;
    hint?: {text: string; fulfilled: boolean; hideDot?: boolean};
    autoComplete?: string;
    onEnter?(): void;
    flat?: boolean;
    disabled?: boolean;
}
const TextInput = React.forwardRef((props: Props, ref: any) => {
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
                disabled={props.disabled === true}
                ref={ref}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={
                    'font-weight-500 text-lg text-gray-800 no-selection ' +
                    'border-0 rounded w-full h-12 ' +
                    'py-2 pl-3 pr-10 md:pr-12 ' +
                    'transition-all duration-100 ' +
                    'outline-none focus:ring ring-blue-300 ' +
                    (props.flat ? 'bg-gray-100 ' : 'bg-white shadow ') +
                    (props.className ? props.className : '') +
                    ' ' +
                    (props.disabled
                        ? 'bg-gray-200 cursor-not-allowed '
                        : 'bg-white ')
                }
                type={props.type ? props.type : 'text'}
                autoComplete={props.autoComplete ? props.autoComplete : ''}
            />
            {props.hint && !props.hint.hideDot && (
                <div
                    className={
                        'absolute top-0 right-0 w-2 h-2 mt-5 mr-2 rounded-full ' +
                        'transition-colors duration-150 ' +
                        (props.hint.fulfilled
                            ? 'bg-green-500 '
                            : 'bg-magenta ') +
                        (focused ? 'opacity-80 ' : 'opacity-50 ')
                    }
                />
            )}
            {props.hint && (
                <div
                    className={
                        'relative w-full px-1 leading-6 mt-1 mb-2 ' +
                        'overflow-hidden font-weight-500 ' +
                        'transition-all duration-150 ' +
                        (props.hint.fulfilled
                            ? 'text-green-500 '
                            : 'text-magenta ') +
                        (focused ? 'opacity-80 ' : 'opacity-50 ')
                    }
                >
                    {props.hint.text}
                </div>
            )}
        </div>
    );
});

export default TextInput;
