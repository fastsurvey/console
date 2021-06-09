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
            colors = 'bg-gray-900 text-red-200';
            break;
        case 'warning':
            colors = 'bg-gray-900 text-yellow-200';
            break;
        case 'success':
            colors = 'bg-gray-900 text-green-200';
            break;
    }

    return (
        <div
            className={
                'centering-row pl-3 pr-1 m-2 ' +
                'font-weight-500  rounded shadow-lg ' +
                `${colors}`
            }
        >
            <div className='py-2.5 text-base leading-6'>
                {props.message.text}
            </div>
            <div className='flex-max' />
            <div
                className='flex-shrink-0 w-10 h-10 p-2 cursor-pointer'
                onClick={props.close}
            >
                {icons.close}
            </div>
        </div>
    );
}

export default VisualMessage;
