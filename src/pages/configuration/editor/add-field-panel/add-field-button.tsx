import React from 'react';

interface Props {
    label: string;
    icon: React.ReactNode;
    leftIcon?: boolean;
    onClick?(): void;
}
function AddFieldButton(props: Props) {
    const icon = (
        <div
            className={
                'w-8 h-8 p-2 group-hover:p-1 transition-size duration-200'
            }
        >
            {props.icon}
        </div>
    );
    return (
        <div
            className='flex flex-row items-center justify-center text-gray-500 rounded cursor-pointer hover:text-teal-600 gap-x-1'
            onClick={props.onClick}
        >
            {props.leftIcon && icon}
            <div
                className={
                    'transition-opacity duration-200 ' +
                    'opacity-0 group-hover:opacity-100 ' +
                    'text-base font-weight-500 leading-8'
                }
            >
                {props.label}
            </div>
            {!props.leftIcon && icon}
        </div>
    );
}

export default AddFieldButton;
