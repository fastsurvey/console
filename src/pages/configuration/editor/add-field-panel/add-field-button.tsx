import React from 'react';

function AddFieldButton(props: {
    label: string;
    icon: React.ReactNode;
    leftIcon?: boolean;
    onClick(): void;
}) {
    const icon = <div className={'w-6 h-6 p-1'}>{props.icon}</div>;
    return (
        <button
            className={
                'centering-row rounded cursor-pointer px-1 ringable ' +
                'icon-dark-gray text-gray-400 hover:text-gray-600 ' +
                'text-opacity-0 group-hover:text-opacity-100 ' +
                'focus:text-gray-600 focus:text-opacity-100 '
            }
            onClick={props.onClick}
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
