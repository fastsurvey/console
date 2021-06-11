import React from 'react';

function IconButton(props: {
    text: string;
    icon?: React.ReactNode;
    onClick?(): void;
    variant?: 'flat-light-blue';
}) {
    let variantClasses: string;
    switch (props.variant) {
        case 'flat-light-blue':
            variantClasses = 'bg-blue-50 text-blue-900 icon-dark-blue';
            break;
        default:
            variantClasses = 'bg-white shadow text-blue-900 icon-blue';
            break;
    }

    return (
        <button
            className={
                'p-0.5 rounded centering-row h-8 ' +
                'cursor-pointer no-selection ringable ' +
                variantClasses
            }
            onClick={props.onClick ? props.onClick : () => {}}
        >
            {props.icon && (
                <div className='p-1 -mr-1.5 w-7 h-7'>{props.icon}</div>
            )}

            <div className={'font-weight-600 px-2'}>{props.text}</div>
        </button>
    );
}

export default IconButton;
