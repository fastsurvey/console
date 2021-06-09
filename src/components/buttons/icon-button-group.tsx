import React from 'react';

function IconButtonGroup(props: {
    buttons: {
        icon: React.ReactNode;
        text: string;
        onClick?(): void;
    }[];
}) {
    const first = (index: number) => index === 0;
    const last = (index: number) => index === props.buttons.length - 1;

    return (
        <div className='flex-shrink-0 shadow bg-gray-200 rounded centering-row whitespace-nowrap gap-x-[2.5px]'>
            {props.buttons.map((b, index: number) => (
                <button
                    key={index}
                    className={
                        'p-1 bg-white hover:bg-gray-100 centering-row ' +
                        'cursor-pointer no-selection ' +
                        'focus:outline-none ring-[2.5px] ring-transparent focus:ring-blue-200 ' +
                        (first(index) ? 'rounded-l ' : ' ') +
                        (last(index) ? 'rounded-r ' : ' ')
                    }
                    onClick={b.onClick ? b.onClick : () => {}}
                >
                    <div className='w-8 h-8 p-1 icon-blue'>{b.icon}</div>
                    <div className={'font-weight-600 text-blue-900 pl-1 pr-2'}>
                        {b.text}
                    </div>
                </button>
            ))}
        </div>
    );
}

export default IconButtonGroup;
