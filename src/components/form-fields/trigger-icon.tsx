import React from 'react';

interface Props {
    onClick?(): void;
    className?: string;
    disabled?: boolean;
    icon: React.ReactNode;
}
const TriggerIcon = (props: Props) => {
    return (
        <div
            className={
                'w-12 h-12 p-3 transition-colors duration-150 ' +
                (props.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 cursor-pointer ') +
                (props.className ? props.className : '')
            }
            onClick={props.onClick !== undefined ? props.onClick : () => {}}
        >
            {props.icon}
        </div>
    );
};

export default TriggerIcon;
