import React from 'react';
import {types} from '@types';
import OptionSummary from './summaries/option-summary';

interface Props {
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    results: types.SurveyResults;
}
function Field(props: Props) {
    const {fieldIndex, fieldConfig, results} = props;
    const fieldResults: any = results.aggregation[fieldIndex];

    const summaryProps = {
        fieldConfig: fieldConfig,
        fieldResults: fieldResults,
        count: results.count,
    };

    const VisualField = (props: any) => (
        <div
            className={
                'w-full bg-white rounded shadow px-4 py-2.5 flex-row-center space-x-4'
            }
        >
            <div className='w-50% mb-3 text-base text-gray-900 font-weight-700'>
                {fieldIndex + 1}. {fieldConfig.title}
            </div>
            <div className='w-50% mb-1 space-x-3 text-sm flex-row-left font-weight-700'>
                {props.children}
            </div>
        </div>
    );

    switch (fieldConfig.type) {
        case 'option':
            return (
                <VisualField>
                    <OptionSummary {...summaryProps} />
                </VisualField>
            );
        default:
            return (
                <div
                    className={
                        'w-full px-4 py-2.5 text-gray-800 rounded relative group cursor-not-allowed ' +
                        'border-2 border-gray-200 border-dashed flex-col-left text-left'
                    }
                >
                    <div className='w-full text-base text-gray-500 font-weight-700'>
                        {fieldIndex + 1}. {fieldConfig.title}
                    </div>
                    <div
                        className={
                            'flex-row-left px-4 text-transparent group-hover:text-gray-900 ' +
                            'absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-0 group-hover:bg-opacity-75 ' +
                            'group-hover:backdrop-filter group-hover:backdrop-blur-[2.5px] z-10 ' +
                            'font-weight-500 text-sm rounded-sm'
                        }
                    >
                        <div>
                            No summary for <strong>{fieldConfig.type}</strong>{' '}
                            fields yet, raw data download coming very soon!
                        </div>
                    </div>
                </div>
            );
    }
}

export default Field;
