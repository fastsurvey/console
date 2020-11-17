import React from 'react';

interface VisualConfigListProps {
    children: React.ReactNode;
}
function VisualConfigList(props: VisualConfigListProps) {
    return (
        <div
            className={
                'fixed flex flex-col w-80 p-2 h-screen ' +
                'border-r-4 border-gray-500 bg-gray-300 ' +
                'overflow-y-scroll overflow-x-hidden'
            }
        >
            {props.children}
        </div>
    );
}

export default VisualConfigList;
