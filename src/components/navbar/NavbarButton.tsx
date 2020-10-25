import React from 'react';

interface NavbarLinkComponentProps {
    text: string;
    active?: boolean;
    icon: React.ReactNode;
}
function NavbarButton(props: NavbarLinkComponentProps) {
    return (
        <div
            className={
                'relative w-58 h-14 mx-3 my-1 p-2 text-lg font-weight-600 flex flex-row items-center justify-start rounded cursor-pointer ' +
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

export default NavbarButton;
