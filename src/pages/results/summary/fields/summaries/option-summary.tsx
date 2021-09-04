import React from 'react';
import {types} from '@types';

export default function OptionSummary(props: {
    fieldConfig: types.SurveyField;
    fieldResults: number;
    count: number;
}) {
    const {fieldResults, fieldConfig, count} = props;
    return (
        <div className='w-full space-x-2 flex-row-left'>
            <div className='text-green-700'>Yes ({fieldResults})</div>
            <div className='flex-grow h-2 max-w-full overflow-hidden rounded-sm flex-row-center'>
                <div
                    className='h-full bg-green-200'
                    style={{
                        width: `${(fieldResults / count) * 100 + 0}%`,
                    }}
                />
                <div
                    className='h-full bg-red-200'
                    style={{
                        width: `${((count - fieldResults) / count) * 100 + 0}%`,
                    }}
                />
            </div>
            <div className='text-red-700'>No ({count - fieldResults})</div>
        </div>
    );
}
