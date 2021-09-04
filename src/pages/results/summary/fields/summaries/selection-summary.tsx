import React from 'react';
import {types} from '@types';

export default function SelectionSummary(props: {
    fieldConfig: types.SelectionField;
    fieldResults: {[key: string]: number};
    count: number;
}) {
    const {fieldResults, fieldConfig, count} = props;
    return (
        <>
            {fieldConfig.options.map((option) => (
                <div className='w-full space-y-[0.1875rem] flex-col-left first:pt-2'>
                    <div className='w-full h-2 overflow-hidden rounded-sm flex-row-center'>
                        <div
                            className='h-full bg-blue-400'
                            style={{
                                width: `${
                                    (fieldResults[option.title] / count) * 100 +
                                    0
                                }%`,
                            }}
                        />
                        <div
                            className='h-full bg-gray-200'
                            style={{
                                width: `${
                                    ((count - fieldResults[option.title]) /
                                        count) *
                                        100 +
                                    0
                                }%`,
                            }}
                        />
                    </div>
                    <div className='text-sm leading-tight text-blue-900 font-weight-700'>
                        {option.title}:{' '}
                        <span className='font-weight-500'>
                            {fieldResults[option.title]} vote
                            {fieldResults[option.title] !== 1 ? 's' : ''},{' '}
                            {(fieldResults[option.title] / count) * 100 + 0}%
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}
