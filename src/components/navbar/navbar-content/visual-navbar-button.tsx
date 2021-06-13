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
            onClick={props.onClick ? props.onClick : () => {}}
            className={
                'relative h-10 my-1 py-0 text-lg ' +
                'lg:w-38 xl:w-48 2xl:w-58 mx-3 px-1 ' +
                'font-weight-600 flex flex-row items-center ' +
                'justify-start rounded cursor-pointer ' +
                (props.active
                    ? 'text-gray-100 bg-gray-700'
                    : 'text-gray-300 hover:text-gray-100 hover:bg-gray-700')
            }
        >
            <div className={'h-8 w-8 p-1'}>{props.icon}</div>
            <div className={'ml-1'}>{props.text}</div>
        </div>
    );
}

export default VisualNavbarButton;
