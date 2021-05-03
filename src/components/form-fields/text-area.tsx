import React, {useState} from 'react';

interface Props {
    value: string;
    onChange(newValue: string): void;
    placeholder?: string;
    charLimits?: {min: number; max: number};
    rows?: number;
    disabled?: boolean;
}
const TextArea = React.forwardRef((props: Props, ref: any) => {
    const [focused, setFocus] = useState(false);

    let hintFulfilled: boolean = true;
    if (props.charLimits) {
        hintFulfilled =
            props.charLimits.min <= props.value.length &&
            props.value.length <= props.charLimits.max;
    }

    function handleKeyDown(e: any) {
        if (e.key === 'Escape') {
            e.target.blur();
        }
    }

    const hintColor = hintFulfilled ? 'green-500' : 'red-500';
    const hintOpacity = focused ? 'opacity-100' : 'opacity-50';

    return (
        <>
            <textarea
                disabled={props.disabled === true}
                rows={props.rows ? props.rows : 3}
                ref={ref}
                onKeyDown={handleKeyDown}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={
                    'font-weight-500 text-lg leading-8 no-selection ' +
                    'border-0 rounded w-full min-h-12 max-h-128 ' +
                    'py-2 pl-3 pr-12 leading-8 bg-gray-100 ' +
                    'transition-all duration-100 resize-none ' +
                    'text-gray-600 focus:text-gray-800 ' +
                    'outline-none focus:ring ring-blue-300 ' +
                    (props.disabled
                        ? ' !bg-gray-200 cursor-not-allowed '
                        : ' bg-white ')
                }
            />

            {props.charLimits && (
                <div className='group'>
                    <>
                        <div
                            className={
                                'absolute top-0 right-0 bottom-0 w-1.5 mt-0 rounded-r ' +
                                'transition-colors duration-150 ' +
                                ` bg-${hintColor} ${hintOpacity} `
                            }
                        />
                        <div
                            className={
                                'absolute top-0 bottom-0 right-1.5 w-1.5 mt-0'
                            }
                        />
                    </>
                    <div
                        className={
                            'absolute bottom-0 right-0 leading-8 pointer-events-none ' +
                            'font-weight-500 mr-3 pl-2 z-10 bg-gray-100 ' +
                            'transition-all duration-150 ' +
                            ` text-${hintColor} ` +
                            (focused
                                ? hintOpacity
                                : 'opacity-0 group-hover:opacity-100 ')
                        }
                    >
                        {props.charLimits.min !== 0 ? 'Not empty, ' : ''}
                        {props.value.length}/{props.charLimits.max}
                    </div>
                </div>
            )}
        </>
    );
});

export default TextArea;
