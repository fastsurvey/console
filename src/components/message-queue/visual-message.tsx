import React, {useEffect, useState} from 'react';
import {icons} from 'assets';
import {types} from 'types';

interface Props {
    message: types.Message;
    close(): void;
}
function VisualMessage(props: Props) {
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
            colors = 'bg-red-200 text-red-800';
            break;
        case 'warning':
            colors = 'bg-yellow-200 text-yellow-800';
            break;
        case 'success':
            colors = 'bg-green-200 text-green-800';
            break;
        default:
            colors = 'bg-gray-200 text-gray-800';
    }

    return (
        <div
            className={
                'flex flex-row items-center font-weight-600 z-50 ' +
                'overflow-hidden pl-3 pr-1 m-2 rounded shadow ' +
                `${size} ${colors} ${delay} ` +
                'transition-all duration-300'
            }
        >
            <div
                className='overflow-x-scroll text-lg whitespace-nowrap hide-scrollbar'
                style={{maxWidth: 'calc(100% - 2.5rems)'}}
            >
                {props.message.text}
            </div>
            <div className='flex-grow' />
            <div
                className='flex-shrink-0 w-10 h-10 p-2 cursor-pointer'
                onClick={handleClose}
            >
                {icons.close}
            </div>
        </div>
    );
}

export default VisualMessage;
