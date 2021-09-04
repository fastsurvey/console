import React from 'react';

export default function PercentageBarRow(props: {
    title: string;
    count: number;
    total: number;
}) {
    const {title, count, total} = props;
    return (
        <div className='w-full space-y-[0.1875rem] flex-col-left first:pt-2'>
            <div className='w-full h-2 overflow-hidden rounded-sm flex-row-center'>
                <div
                    className='h-full bg-blue-400'
                    style={{
                        width: `${(count / total) * 100 + 0}%`,
                    }}
                />
                <div
                    className='h-full bg-gray-200'
                    style={{
                        width: `${((total - count) / total) * 100 + 0}%`,
                    }}
                />
            </div>
            <div className='text-sm leading-tight text-blue-900 font-weight-700'>
                {title}:{' '}
                <span className='font-weight-500'>
                    {count} vote
                    {count !== 1 ? 's' : ''}, {(count / total) * 100 + 0}%
                </span>
            </div>
        </div>
    );
}
