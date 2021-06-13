import React from 'react';

export default function ButtonGroup(props: {
    buttons: {
        icon: React.ReactNode;
        text: string;
        onClick?(): void;
        disabled?: boolean;
    }[];
}) {
    const first = (index: number) => index === 0;
    const last = (index: number) => index === props.buttons.length - 1;

    return (
        <div className='flex-shrink-0 bg-gray-200 rounded shadow centering-row whitespace-nowrap gap-x-[2.6px]'>
            {props.buttons.map((b, index: number) => (
                <button
                    key={index}
                    className={
                        'p-0.5 centering-row ' +
                        ' no-selection ringable rounded-sm ' +
                        (first(index) ? 'rounded-l ' : ' ') +
                        (last(index) ? 'rounded-r ' : ' ') +
                        (b.disabled
                            ? 'bg-gray-100 text-gray-600 cursor-default icon-gray '
                            : 'bg-white hover:bg-gray-100 text-blue-900 cursor-pointer icon-blue ')
                    }
                    onClick={b.onClick && !b.disabled ? b.onClick : () => {}}
                    disabled={b.disabled ? b.disabled : false}
                >
                    <div className='p-1 w-7 h-7'>{b.icon}</div>
                    <div className={'font-weight-600 pl-1 pr-2 '}>{b.text}</div>
                </button>
            ))}
        </div>
    );
}
