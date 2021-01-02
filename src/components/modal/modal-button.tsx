import React from 'react';

interface Props {
    label: string;
    color?: 'green' | 'green-light' | 'red-light';
    onClick(): void;
    disabled?: boolean;
}
function ModalButton(props: Props) {
    let colorClasses: string;

    switch (props.color) {
        case 'green':
            colorClasses = 'text-green-900 bg-green-500 ';
            break;
        case 'green-light':
            colorClasses = 'text-green-600 bg-green-300 ';
            break;
        case 'red-light':
            colorClasses = 'text-red-500 bg-red-200 ';
            break;
        default:
            colorClasses = 'text-gray-700 bg-gray-300 ';
            break;
    }

    return (
        <div
            className={
                'h-10 px-2 py-1 leading-8 font-weight-600 ' +
                'no-selection rounded text-lg ' +
                'transition-colors duration-200 ' +
                (props.disabled ? 'cursor-not-allowed ' : 'cursor-pointer ') +
                colorClasses
            }
            onClick={!props.disabled ? props.onClick : () => {}}
        >
            {props.label}
        </div>
    );
}

export default ModalButton;
