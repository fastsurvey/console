import React from 'react';

interface Props {
    children: React.ReactNode;
}
const VisualStrip = (props: Props) => (
    <div
        id='ControlStrip'
        className={
            'z-40 fixed center-content p-4 border-b-4 border-gray-500 ' +
            'bg-gray-300 no-selection '
        }
    >
        <div
            className={
                'relative w-auto flex flex-row items-center shadow rounded'
            }
        >
            {props.children}
        </div>
    </div>
);

export default VisualStrip;
