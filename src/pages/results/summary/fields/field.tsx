import React from 'react';
import {types} from '@types';

interface Props {
    fieldConfig: types.SurveyField;
    fieldResults: number | null | {[key: string]: number};
}
function Field(props: Props) {
    const {fieldConfig, fieldResults} = props;

    switch (fieldConfig.type) {
        case 'option':
            return (
                <div className='bg-white rounded shadow'>
                    {fieldConfig.title}
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
                    <div className='w-full mb-1.5 text-base text-gray-700 font-weight-700'>
                        {fieldConfig.title}
                    </div>
                    <div className='w-full text-sm text-gray-700 font-weight-500'>
                        No aggregation for <strong>{fieldConfig.type}</strong>{' '}
                        fields yet, raw data download coming very soon!
                    </div>
                </div>
            );
    }
}

export default Field;
