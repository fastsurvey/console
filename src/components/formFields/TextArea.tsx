import React, {useState} from 'react';

interface TextAreaProps {
    value: string;
    onChange(newValue: string): void;
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
    charLimits?: {min: number; max: number};
    autoComplete?: string;
    onEnter?(): void;
    flat?: boolean;
    rows?: number;
    disabled?: boolean;
}

const TextArea = React.forwardRef((props: TextAreaProps, ref: any) => {
    const placeholder =
        props.placeholder !== undefined ? props.placeholder : '';
    const autoComplete =
        props.autoComplete !== undefined ? props.autoComplete : '';

    const [focused, setFocus] = useState(false);

    let hintFulfilled: boolean = true;
    if (props.charLimits !== undefined) {
        hintFulfilled =
            props.charLimits.min <= props.value.length &&
            props.value.length <= props.charLimits.max;
    }

    function handleKeyDown(e: any) {
        if (e.key === 'Enter') {
            if (props.onEnter !== undefined) {
                props.onEnter();
            }
        } else if (e.key === 'Escape') {
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
            <textarea
                disabled={props.disabled === true}
                rows={props.rows ? props.rows : 4}
                ref={ref}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={
                    'font-weight-500 text-lg md:no-selection ' +
                    'border-0 rounded w-full min-h-12 max-h-128 ' +
                    'py-2 pl-3 pr-12 text-gray-800 leading-8 ' +
                    (props.flat
                        ? 'shadow-outline-gray bg-white transition duration-150 '
                        : 'shadow ') +
                    'focus:outline-none focus:shadow-outline ' +
                    (props.className ? props.className : '') +
                    ' ' +
                    (props.disabled
                        ? 'bg-gray-200 cursor-not-allowed '
                        : 'bg-white ')
                }
                autoComplete={autoComplete}
            />
            {props.charLimits && (
                <div
                    className={
                        'absolute top-0 right-0 w-2 h-2 mt-5 mr-2 rounded-full ' +
                        (hintFulfilled ? 'bg-green-500' : 'bg-magenta')
                    }
                />
            )}
            {props.charLimits && (
                <div
                    className={
                        'relative w-full px-1 leading-6 ' +
                        'overflow-hidden font-weight-600 ' +
                        (hintFulfilled ? 'text-green-500' : 'text-magenta') +
                        ' transition-size-colors duration-300 ' +
                        (focused ? 'h-8 py-1 mb-2' : 'h-0 py-0 mb-0')
                    }
                >
                    {props.charLimits.min !== 0 ? 'Not empty, ' : ''}
                    {props.value.length}/{props.charLimits.max} characters
                </div>
            )}
        </div>
    );
});

export default TextArea;
