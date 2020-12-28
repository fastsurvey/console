import React from 'react';

interface Props {
    label: string;
    children: React.ReactNode;
    className?: string;
}
function EditorFormRow(props: Props) {
    return (
        <div className={`flex flex-row items-start w-full ${props.className}`}>
            <div className='lg:w-25% 2xl:w-15%'>
                <div
                    className={
                        'h-12 mr-4 leading-12 text-lg ' +
                        'text-right font-weight-600'
                    }
                >
                    {props.label}:
                </div>
            </div>
            <div className='lg:w-75% 2xl:w-85% relative'>{props.children}</div>
        </div>
    );
}

export default EditorFormRow;
