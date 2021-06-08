import React from 'react';

function IconButton(props: {
    icon: React.ReactNode;
    text: string;
    onClick?(): void;
}) {
    return (
        <button
            className={
                'p-1 bg-white rounded shadow centering-row ' +
                'cursor-pointer no-selection ' +
                'focus:outline-none ring ring-transparent focus:ring-blue-200'
            }
            onClick={props.onClick ? props.onClick : () => {}}
        >
            <div className='w-8 h-8 p-1 icon-blue'>{props.icon}</div>
            <div className={'font-weight-600 text-blue-900 pl-1 pr-2'}>
                {props.text}
            </div>
        </button>
    );
}

export default IconButton;
