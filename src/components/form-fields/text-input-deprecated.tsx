import React, {useState} from 'react';

interface Props {
    value: string;
    postfix?: string;
    onChange(newValue: string): void;
    type?: string;
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
    required?: boolean;
    hint?: {
        text: string;
        fulfilled: boolean;
        hideDot?: boolean;
        inlineHint?: boolean;
    };
    autoComplete?: string;
    onEnter?(): void;
    flat?: boolean;
    disabled?: boolean;
}
const TextInputDeprecated = React.forwardRef((props: Props, ref: any) => {
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

    const hintTextColor = props.hint?.fulfilled
        ? 'text-green-500'
        : 'text-red-500';
    const hintBgColor = props.hint?.fulfilled ? 'bg-green-500' : 'bg-red-500';
    const hintOpacity = focused ? 'opacity-100' : 'opacity-50';

    return (
        <div
            className={
                'relative w-full ' +
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
                    'font-weight-500 text-lg no-selection ' +
                    'border-0 rounded w-full h-12 ' +
                    'py-2 pl-3 pr-10 md:pr-12 ' +
                    'text-gray-700 focus:text-gray-900 ' +
                    'transition-all duration-100 ' +
                    'outline-none focus:ring ring-blue-300 ' +
                    (props.flat
                        ? 'bg-gray-100 focus:bg-gray-100 '
                        : 'bg-white shadow ') +
                    (props.className ? props.className : '') +
                    ' ' +
                    (props.disabled ? '!bg-gray-200 cursor-not-allowed ' : '')
                }
                type={props.type ? props.type : 'text'}
                autoComplete={props.autoComplete ? props.autoComplete : ''}
            />
            {props.hint && (
                <div className='group'>
                    {!props.hint.hideDot && (
                        <>
                            <div
                                className={
                                    'absolute top-0 right-0 w-1.5 h-12 mt-0 rounded-r ' +
                                    'transition-colors duration-150 ' +
                                    ` ${hintBgColor} ${hintOpacity} `
                                }
                            />
                            <div
                                className={
                                    'absolute top-0 right-1.5 w-1.5 h-12 mt-0'
                                }
                            />
                        </>
                    )}

                    {props.hint.inlineHint && (
                        <div
                            className={
                                'absolute top-0 right-0 leading-12 pointer-events-none ' +
                                'font-weight-500 mr-3 pl-2 z-10 ' +
                                'transition-all duration-150 ' +
                                ` ${hintTextColor} ` +
                                (props.flat ? 'bg-gray-100 ' : 'bg-white ') +
                                (focused
                                    ? hintOpacity
                                    : 'opacity-0 group-hover:opacity-100 ')
                            }
                        >
                            {props.hint.text}
                        </div>
                    )}
                    {!props.hint.inlineHint && (
                        <div
                            className={
                                'relative w-full px-1 leading-6 mt-1 mb-1 ' +
                                'overflow-hidden font-weight-500 ' +
                                'transition-all duration-150 ' +
                                ` ${hintTextColor} ${hintOpacity} `
                            }
                        >
                            {props.hint.text}
                        </div>
                    )}
                </div>
            )}
            {props.postfix && (
                <div
                    className={
                        'absolute top-0 left-0 ml-3 leading-12 pt-px z-0 ' +
                        'font-weight-500 text-lg text-gray-800 pointer-events-none '
                    }
                >
                    <span className='opacity-0'>{props.value}</span>
                    <span className='opacity-60'>{props.postfix}</span>
                </div>
            )}
        </div>
    );
});

export default TextInputDeprecated;
