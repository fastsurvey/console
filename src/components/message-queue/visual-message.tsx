import React, {useState, useEffect} from 'react';
import {icons} from '/src/assets';
import {types} from '/src/types';

interface Props {
    message: types.Message;
    close(): void;
}
function VisualMessage(props: Props) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 450);
    }, [props.message.randomToken]);

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
                'flex-row-center pl-3 pr-1 m-2 bg-gray-900 ' +
                'font-weight-500 rounded shadow-lg flex-grow max-w-full ' +
                `${colors} ${animate ? 'animate-pop' : ''}`
            }
            data-cy={`message-panel-${props.message.type}`}
        >
            <div className='py-2.5 text-base leading-6' data-cy='message'>
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
