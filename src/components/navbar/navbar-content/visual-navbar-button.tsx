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
                'relative h-12 my-1 py-1 text-lg ' +
                'lg:w-38 xl:w-48 2xl:w-58 mx-3 px-2 ' +
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
