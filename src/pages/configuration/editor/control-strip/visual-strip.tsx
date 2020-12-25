import React from 'react';

interface Props {
    children: React.ReactNode;
}
const VisualStrip = (props: Props) => (
    <div
        className={
            'left-0 right-0 pt-2 pb-1 z-40 fixed center-content ' +
            'shadow-control-strip ' +
            'bg-gray-100 no-selection ' +
            'lg:ml-104 xl:ml-124 2xl:ml-144 '
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
