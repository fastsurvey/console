import React from 'react';

interface VisualNavbarButtonProps {
    text: string;
    active?: boolean;
    icon: React.ReactNode;
    onClick?(): void;
}
function VisualNavbarButton(props: VisualNavbarButtonProps) {
    return (
        <div
            onClick={props.onClick}
            className={
                'relative w-58 h-12 mx-3 my-1 px-2 py-1 text-lg ' +
                'font-weight-600 flex flex-row items-center ' +
                'justify-start rounded cursor-pointer ' +
                (props.active
                    ? 'text-white bg-gray-800'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800')
            }
        >
            <div className={'h-8 w-8'}>{props.icon}</div>
            <div className={'ml-2'}>{props.text}</div>
        </div>
    );
}

export default VisualNavbarButton;
