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
                'centering-row rounded px-1 ringable ' +
                'svg-add-field md:text-gray-400  ' +
                'text-opacity-60 hover:text-opacity-100 ' +
                'focus:text-gray-600 focus:text-opacity-100 ' +
                (props.disabled
                    ? 'cursor-not-allowed text-gray-400 '
                    : 'cursor-pointer md:hover:text-gray-600 text-gray-600')
            }
            onClick={!props.disabled ? props.onClick : () => {}}
            disabled={props.disabled}
            data-cy={props['data-cy']}
        >
            {props.leftIcon && icon}
            <div className={'px-1 text-sm font-weight-600 leading-8 '}>
                {props.label}
            </div>
            {!props.leftIcon && icon}
        </button>
    );
}

export default AddFieldButton;
