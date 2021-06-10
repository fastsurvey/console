import React from 'react';

function IconButton(props: {
    icon: React.ReactNode;
    text: string;
    onClick?(): void;
}) {
    return (
        <button
            className={
                'p-0.5 bg-white rounded shadow centering-row ' +
                'cursor-pointer no-selection ringable'
            }
            onClick={props.onClick ? props.onClick : () => {}}
        >
            <div className='p-1 w-7 h-7 icon-blue'>{props.icon}</div>
            <div className={'font-weight-600 text-blue-900 pl-1 pr-2'}>
                {props.text}
            </div>
        </button>
    );
}

export default IconButton;
