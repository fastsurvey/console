import React from 'react';

interface VisualStripProps {
    children: React.ReactNode;
}
const VisualStrip = (props: VisualStripProps) => (
    <div
        id='ControlStrip'
        className={
            'z-50 fixed center-content p-4 border-b-4 border-gray-500 ' +
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
