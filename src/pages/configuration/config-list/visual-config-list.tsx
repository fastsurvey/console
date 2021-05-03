import React from 'react';

interface Props {
    children: React.ReactNode;
}
function VisualConfigList(props: Props) {
    return (
        <div
            className={
                'fixed top-0 flex flex-col h-screen ' +
                'lg:ml-44 lg:w-60 xl:ml-54 xl:w-70 2xl:ml-64 2xl:w-80 ' +
                ' bg-gray-200 z-40 ' +
                'overflow-y-scroll overflow-x-visible'
            }
        >
            {props.children}
        </div>
    );
}

export default VisualConfigList;
