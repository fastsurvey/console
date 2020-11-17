import React from 'react';

interface TriggerIconProps {
    onClick?(): void;
    className?: string;
    disabled?: boolean;
    icon: React.ReactNode;
}

const TriggerIcon = (props: TriggerIconProps) => {
    return (
        <div
            className={
                'w-12 h-12 p-3 transition-colors duration-150 ' +
                (props.disabled
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-800 cursor-pointer ') +
                (props.className ? props.className : '')
            }
            onClick={props.onClick !== undefined ? props.onClick : () => {}}
        >
            {props.icon}
        </div>
    );
};

export default TriggerIcon;
