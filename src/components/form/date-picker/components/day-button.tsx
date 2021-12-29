import React from 'react';

export function DayButton(props: {
    open: boolean;
    disabled: boolean;
    label: number;
    dayIsSelected: boolean;
    onClick(): void;
    style?: any;
}) {
    return (
        <button
            style={props.style}
            className={
                'py-1 md:py-0 w-7 h-5 -mx-0.5 px-0.5 text-center ' +
                'rounded-sm ringable z-20 ' +
                (props.dayIsSelected
                    ? 'bg-red-500 text-red-50 z-0 font-weight-700 '
                    : 'hover:text-white z-10 font-weight-600 ')
            }
            onClick={() => {
                if (!props.disabled) {
                    props.onClick();
                }
            }}
            disabled={!props.open}
        >
            {props.label}
        </button>
    );
}
