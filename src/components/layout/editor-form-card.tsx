import React from 'react';

interface Props {
    label: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    className?: string;
    color?: 'green' | 'gray';
}
function EditorFormCard(props: Props) {
    let colors: string;
    switch (props.color) {
        case 'green':
            colors = 'bg-emerald-300 text-emerald-700';
            break;
        case 'gray':
        default:
            colors = 'bg-gray-300 text-gray-600';
            break;
    }

    return (
        <div
            className={'relative flex flex-col w-full my-4 ' + props.className}
        >
            <div
                className={
                    'absolute left-0 right-0 top-0 bottom-0 ' +
                    'rounded shadow-md mr-1 mb-1 z-0 ' +
                    'flex flex-row items-start justify-start ' +
                    'font-weight-600 text-lg leading-10 ' +
                    colors
                }
            >
                <div className='w-10 h-10 p-2 ml-1 opacity-60'>
                    {props.icon}
                </div>
                <div>{props.label}</div>
            </div>
            <div
                className={
                    'flex flex-col left-0 right-0 min-h-full p-2 pt-4 ml-1 ' +
                    'rounded shadow-md bg-white mt-10 z-10'
                }
            >
                {props.children}
            </div>
        </div>
    );
}

export default EditorFormCard;
