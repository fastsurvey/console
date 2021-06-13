import React from 'react';

function AddFieldButton(props: {
    label: string;
    icon: React.ReactNode;
    leftIcon?: boolean;
    onClick(): void;
    disabled: boolean;
}) {
    const icon = <div className={'w-6 h-6 p-1'}>{props.icon}</div>;
    return (
        <button
            className={
                'centering-row rounded px-1 ringable ' +
                'icon-dark-gray text-gray-400 ' +
                'text-opacity-0 group-hover:text-opacity-100 ' +
                'focus:text-gray-600 focus:text-opacity-100 ' +
                (props.disabled
                    ? 'cursor-not-allowed '
                    : 'cursor-pointer hover:text-gray-600 ')
            }
            onClick={!props.disabled ? props.onClick : () => {}}
            disabled={props.disabled}
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
