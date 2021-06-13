import React from 'react';

export default function Toggle(props: {
    value: boolean;
    setValue(v: boolean): void;
    disabled?: boolean;
}) {
    const {value, setValue} = props;

    const sharedClasses = (active: boolean = false) =>
        'w-12 text-center h-7 ringable-dark font-weight-600 rounded ' +
        (active ? 'text-blue-900 bg-blue-200 ' : ' text-gray-500');

    return (
        <div className='relative my-1 bg-gray-100 rounded centering-row gap-x-1'>
            <button
                className={sharedClasses(value)}
                onClick={() => setValue(true)}
            >
                Yes
            </button>
            <button
                className={sharedClasses(!value)}
                onClick={() => setValue(false)}
            >
                No
            </button>
        </div>
    );
}
