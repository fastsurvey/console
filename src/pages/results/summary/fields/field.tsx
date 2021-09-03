import React from 'react';
import {types} from '@types';

interface Props {
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    results: types.SurveyResults;
}
function Field(props: Props) {
    const {fieldIndex, fieldConfig, results} = props;
    const fieldResults: any = results.aggregation[fieldIndex];

    switch (fieldConfig.type) {
        case 'option':
            return (
                <div className={'w-full bg-white rounded shadow px-4 py-2.5'}>
                    <div className='w-full mb-3 text-base text-gray-900 font-weight-700'>
                        {fieldIndex + 1}. {fieldConfig.title}
                    </div>
                    <div className='mb-1 space-x-3 text-sm flex-row-left font-weight-700'>
                        <div className='text-green-700'>
                            Yes ({fieldResults})
                        </div>
                        <div className='w-64 h-2 max-w-full overflow-hidden rounded-sm flex-row-center'>
                            <div
                                className='h-full bg-green-200'
                                style={{
                                    width: `${
                                        (fieldResults / results.count) * 100 + 0
                                    }%`,
                                }}
                            />
                            <div
                                className='h-full bg-red-200'
                                style={{
                                    width: `${
                                        ((results.count - fieldResults) /
                                            results.count) *
                                            100 +
                                        0
                                    }%`,
                                }}
                            />
                        </div>
                        <div className='text-red-700'>
                            No ({results.count - fieldResults})
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div
                    className={
                        'w-full px-4 py-2.5 text-gray-700 rounded ' +
                        'border-2 border-gray-200 border-dashed flex-col-left text-left'
                    }
                >
                    <div className='w-full mb-1.5 text-base text-gray-600 font-weight-700'>
                        {fieldIndex + 1}. {fieldConfig.title}
                    </div>
                    <div className='w-full text-sm text-gray-500 font-weight-400'>
                        No aggregation for <strong>{fieldConfig.type}</strong>{' '}
                        fields yet, raw data download coming very soon!
                    </div>
                </div>
            );
    }
}

export default Field;
