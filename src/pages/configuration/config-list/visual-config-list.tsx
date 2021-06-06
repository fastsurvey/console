import React from 'react';

interface Props {
    children: React.ReactNode;
}
function VisualConfigList(props: Props) {
    return (
        <div
            className={
                'p-2 min-h-screen w-full z-0 centering-col ' +
                'overflow-y-scroll overflow-x-hidden'
            }
        >
            <div className='max-w-3xl bg-red-400'>{props.children}</div>
        </div>
    );
}

export default VisualConfigList;
