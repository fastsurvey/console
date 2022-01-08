import React from 'react';
import {icons} from '/src/assets';

export default function Toggle(props: {
    value: boolean;
    setValue(v: boolean): void;
    disabled?: boolean;
    'data-cy'?: string;
    trueLabel?: string;
    falseLabel?: string;
}) {
    const {value, setValue} = props;

    const sharedClasses = (active: boolean = false) =>
        'min-w-[3rem] pl-2 pr-3 rounded flex-row-center ' +
        'gap-x-1.5 ringable-dark font-weight-600 ' +
        'leading-tight py-1.5 flex-shrink-0 ' +
        (props.disabled
            ? active
                ? 'text-blue-700 bg-blue-300 cursor-not-allowed '
                : ' text-gray-400 cursor-not-allowed '
            : active
            ? 'text-blue-900 bg-blue-150 '
            : 'text-gray-600 ');

    return (
        <div
            className='relative mt-1 bg-gray-100 rounded centering-row gap-x-1'
            data-cy={props['data-cy']}
        >
            <button
                className={sharedClasses(value)}
                onClick={!props.disabled ? () => setValue(true) : () => {}}
                disabled={props.disabled === true}
                data-cy={`yes ${value ? 'isactive' : 'isinactive'}`}
            >
                <div
                    className={`w-4 h-4 flex-shrink-0 ${
                        value ? 'svg-toggle-true' : 'svg-toggle-false'
                    }`}
                >
                    {icons.checkCircle}
                </div>
                <div>{props.trueLabel === undefined ? 'Yes' : props.trueLabel}</div>
            </button>
            <button
                className={sharedClasses(!value)}
                onClick={!props.disabled ? () => setValue(false) : () => {}}
                disabled={props.disabled === true}
                data-cy={`no ${!value ? 'isactive' : 'isinactive'}`}
            >
                <div
                    className={`w-4 h-4 flex-shrink-0 ${
                        !value ? 'svg-toggle-true' : 'svg-toggle-false'
                    }`}
                >
                    {icons.checkCircle}
                </div>
                <div>{props.falseLabel === undefined ? 'No' : props.falseLabel}</div>
            </button>
        </div>
    );
}
