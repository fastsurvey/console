import React from 'react';

export default function PercentageBarRow(props: {
    title: string;
    count: number;
    total: number;
    variant?: 'green' | 'red';
}) {
    const {title, count, total} = props;
    let barColor: string;
    let textColor: string;
    switch (props.variant) {
        case 'green':
            barColor = 'bg-green-400';
            textColor = 'text-green-900';
            break;
        case 'red':
            barColor = 'bg-red-400';
            textColor = 'text-red-900';
            break;
        default:
            barColor = 'bg-blue-400';
            textColor = 'text-blue-900';
            break;
    }
    return (
        <div className='w-full space-y-[0.1875rem] flex-col-left first:pt-2'>
            <div className='w-full h-2 overflow-hidden rounded-sm flex-row-center'>
                {total === 0 && <div className={`h-full w-full bg-gray-100`} />}
                {total !== 0 && (
                    <>
                        <div
                            className={`h-full ${barColor}`}
                            style={{
                                width: `${(count / total) * 100 + 0}%`,
                            }}
                        />
                        <div
                            className='h-full bg-gray-200'
                            style={{
                                width: `${
                                    ((total - count) / total) * 100 + 0
                                }%`,
                            }}
                        />
                    </>
                )}
            </div>
            <div
                className={`text-sm leading-tight font-weight-700 ${textColor}`}
            >
                {title}:{' '}
                <span className='font-weight-500'>
                    {count} {count !== 0 && `(${(count / total) * 100 + 0}%)`}
                </span>
            </div>
        </div>
    );
}
