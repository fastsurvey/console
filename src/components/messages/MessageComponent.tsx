import React, {useEffect, useState} from 'react';

import stateTypes from 'utilities/types/stateTypes';

import icons from 'assets/icons/icons';

interface MessageComponentProps {
    message: stateTypes.Message;
    close(): void;
}

function MessageComponent(props: MessageComponentProps) {
    const [size, setSize] = useState('h-0 py-0');
    const [delay, setDelay] = useState('delay-200');
    const [toBeClosed, setToBeClosed] = useState(false);

    useEffect(() => {
        if (size === 'h-0 py-0' && !toBeClosed) {
            setSize('h-12 py-2');
        }
    }, [size, toBeClosed]);

    function handleClose() {
        setToBeClosed(true);
        setDelay('');
        setSize('h-0 py-0');
        setTimeout(() => {
            props.close();
        }, 300);
    }

    let colors: string;
    switch (props.message.type) {
        case 'error':
            colors = 'bg-red-600 text-red-100';
            break;
        case 'warning':
            colors = 'bg-yellow-400 text-yellow-800';
            break;
        case 'success':
            colors = 'bg-green-500 text-green-100';
            break;
        default:
            colors = 'bg-gray-300 text-gray-800';
    }

    return (
        <div
            className={
                'flex flex-row items-center font-weight-600 ' +
                'overflow-hidden pl-3 pr-1 m-2 rounded shadow ' +
                size +
                ' ' +
                colors +
                ' ' +
                delay +
                ' transition-all duration-300'
            }
        >
            <div className='text-lg'>{props.message.text}</div>
            <div className='flex-grow' />
            <div className='w-10 h-10 p-1 cursor-pointer' onClick={handleClose}>
                {icons.close}
            </div>
        </div>
    );
}

export default MessageComponent;
