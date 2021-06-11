import React from 'react';

export default function Label(props: {text: string}) {
    return (
        <label className='w-full px-1 text-sm text-left text-gray-600 font-weight-600 '>
            {props.text}:
        </label>
    );
}
