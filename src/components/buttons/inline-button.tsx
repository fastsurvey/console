import React from 'react';

function InlineButton(props: {text: string; icon: React.ReactNode}) {
    return (
        <div className='h-10 centering-row'>
            <div className='w-8 h-8 p-1 mt-0.25'>{props.icon}</div>
            <div>{props.text}</div>
        </div>
    );
}

export default InlineButton;
