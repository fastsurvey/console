import React from 'react';

function AddFieldButton(props: {
    label: string;
    icon: React.ReactNode;
    leftIcon?: boolean;
    onClick(): void;
    disabled: boolean;
    'data-cy': string;
}) {
    const icon = <div className={'w-6 h-6 p-1'}>{props.icon}</div>;
    return (
        <button
            className={
                'centering-row rounded px-1 ringable svg-add-field ' +
                'svg-add-field   ' +
                'focus:text-gray-600 focus:text-opacity-100 ' +
                (props.disabled
                    ? 'cursor-not-allowed text-gray-600 '
                    : 'cursor-pointer text-gray-800')
            }
            onClick={!props.disabled ? props.onClick : () => {}}
            disabled={props.disabled}
            data-cy={props['data-cy']}
        >
            {props.leftIcon && icon}
            <div
                className={
                    'px-1 text-sm font-weight-600 leading-8 ' +
                    'opacity-50 hover:opacity-100'
                }
            >
                {props.label}
            </div>
            {!props.leftIcon && icon}
        </button>
    );
}

export default AddFieldButton;
