import React, {useEffect, useState} from 'react';
import {ICONS} from '../../assets/icons/icons';

interface MessageProps {
    text: string;
    close(): void;
}

function Message(props: MessageProps) {
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

    return (
        <div
            className={
                'flex flex-row items-center text-gray-800 font-weight-600 ' +
                'overflow-hidden px-2 m-2 bg-gray-100 rounded shadow ' +
                size +
                ' ' +
                delay +
                ' transition-all duration-300'
            }
        >
            <div className='text-lg'>{props.text}</div>
            <div className='flex-grow' />
            <div className='cursor-pointer' onClick={handleClose}>
                {ICONS.close}
            </div>
        </div>
    );
}

export default Message;
