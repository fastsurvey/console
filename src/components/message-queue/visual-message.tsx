import React from 'react';
import {icons} from 'assets';
import {types} from 'types';

interface Props {
    message: types.Message;
    close(): void;
}
function VisualMessage(props: Props) {
    let colors: string;
    switch (props.message.type) {
        case 'error':
            colors = 'text-red-200';
            break;
        case 'warning':
            colors = 'text-yellow-200';
            break;
        case 'success':
            colors = 'text-green-200';
            break;
    }

    return (
        <div
            className={
                'centering-row pl-3 pr-1 m-2 bg-gray-900 ' +
                'font-weight-500 rounded shadow-lg w-full ' +
                `${colors}`
            }
        >
            <div className='py-2.5 text-base leading-6'>
                {props.message.text}
            </div>
            <div className='flex-max' />
            <button
                className={
                    'flex-shrink-0 w-7 h-7 p-0.5 m-1.5 cursor-pointer rounded ' +
                    'focus:outline-none ring-[2.5px] ring-transparent focus:ring-blue-200'
                }
                onClick={props.close}
            >
                {icons.close}
            </button>
        </div>
    );
}

export default VisualMessage;
