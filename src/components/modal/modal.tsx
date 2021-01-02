import React, {useEffect} from 'react';

interface Props {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose(): void;
}
function Modal(props: Props) {
    useEffect(() => {
        if (props.open) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100vw';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [props.open]);

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 pointer-events-auto center-content no-selection'>
            <div
                className='absolute top-0 left-0 z-0 w-full h-full bg-gray-800 opacity-70'
                onClick={props.onClose}
            />
            <div className='z-10 flex flex-col items-center justify-center p-4 bg-white rounded shadow'>
                <div className='mb-2 text-xl font-weight-600'>
                    {props.title}
                </div>
                <div className='max-w-50%'>{props.children}</div>
            </div>
        </div>
    );
}

export default Modal;
