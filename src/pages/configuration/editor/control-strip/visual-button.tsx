import React from 'react';

interface Props {
    label: string;
    icon: React.ReactNode;
    first?: boolean;
    last?: boolean;
    disabled?: boolean;
    onClick?(): void;
}
const VisualButton = (props: Props) => (
    <div
        onClick={() => {
            if (!props.disabled && props.onClick !== undefined) {
                props.onClick();
            }
        }}
        className={
            'py-1 px-2 h-10 flex flex-row items-center justify-center ' +
            (props.disabled
                ? 'cursor-not-allowed bg-gray-200 '
                : 'cursor-pointer bg-white hover:text-blue-600 ') +
            (props.first ? 'rounded-l ' : '') +
            (props.last ? 'rounded-r ' : '') +
            (!props.first ? 'border-l ' : '') +
            (!props.last ? 'border-r ' : '')
        }
    >
        <div className={'h-8 w-8 p-1'}>{props.icon}</div>
        <div className={'text-lg font-weight-600 mr-2'}>{props.label}</div>
    </div>
);
export default VisualButton;
