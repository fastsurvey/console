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
                <div className='bg-white rounded shadow'>
                    no aggregation for ... fields yet, raw data download coming
                    very soon!
                </div>
            );
    }
}

export default Field;
