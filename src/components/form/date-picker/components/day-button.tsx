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
                'w-8 h-7 sm:h-5 text-center ' +
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
            data-cy={`${props.dayIsSelected ? 'selected-' : ''}day-button-${
                props.label
            } `}
        >
            {props.label}
        </button>
    );
}
