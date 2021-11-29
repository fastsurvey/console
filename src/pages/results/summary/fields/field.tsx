import React from 'react';
import {types} from '/src/types';
import OptionSummary from './summaries/option-summary';
import ChoiceSummary from './summaries/choice-summary';

interface Props {
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    results: types.SurveyResults;
}
function Field(props: Props) {
    const {fieldIndex, fieldConfig, results} = props;
    const fieldResults: any = results[fieldConfig.identifier].value;
    const fieldCount: any = results[fieldConfig.identifier].count;

    const summaryProps: any = {
        fieldConfig: fieldConfig,
        fieldResults: fieldResults,
        count: fieldCount,
    };

    const VisualField = (props: {children: React.ReactNode; subtitle: string}) => (
        <section
            className={
                'w-full bg-white rounded shadow px-4 py-3 ' +
                'flex flex-col md:flex-row items-start justify-start ' +
                'space-y-4 md:space-y-0 md:space-x-4'
            }
            data-cy={`field-container-${fieldIndex} isaggregated`}
        >
            <div className='w-full md:w-50% flex-col-left space-y-0.5'>
                <h2 className='text-base text-gray-900 font-weight-700' data-cy='title'>
                    {fieldIndex + 1}. {fieldConfig.title}{' '}
                    <span className='font-weight-500 opacity-70 whitespace-nowrap'>
                        {`(${fieldCount} submission${fieldCount !== 1 ? 's' : ''})`}
                    </span>
                </h2>
                <div className='text-sm text-gray-600 font-weight-500'>
                    {props.subtitle}
                </div>
            </div>
            <div
                className='w-full md:w-50% space-y-3 text-sm flex-col-left font-weight-700'
                data-cy='graph-container'
            >
                {props.children}
            </div>
        </section>
    );

    switch (fieldConfig.type) {
        case 'option':
            return (
                <VisualField subtitle='yes/no'>
                    <OptionSummary {...summaryProps} />
                </VisualField>
            );
        case 'radio':
            return (
                <VisualField subtitle={`choose 1 option`}>
                    <ChoiceSummary {...summaryProps} />
                </VisualField>
            );
        case 'selection':
            return (
                <VisualField
                    subtitle={`choose between ${fieldConfig.min_select} and ${fieldConfig.max_select} options`}
                >
                    <ChoiceSummary {...summaryProps} />
                </VisualField>
            );
        default:
            return (
                <section
                    className={
                        'w-full px-4 py-2.5 text-gray-800 rounded relative group cursor-not-allowed ' +
                        'border-2 border-gray-200 border-dashed flex-col-left text-left'
                    }
                    data-cy={`field-container-${fieldIndex} isnotaggregated`}
                >
                    <h2
                        className='w-full text-base text-gray-600 font-weight-700'
                        data-cy='title'
                    >
                        {fieldIndex + 1}. {fieldConfig.title}{' '}
                        <span className='font-weight-500 opacity-70 whitespace-nowrap'>
                            {`(${fieldCount} submission${fieldCount !== 1 ? 's' : ''})`}
                        </span>
                    </h2>
                    <div
                        className={
                            'flex-row-left px-4 text-transparent group-hover:text-gray-900 z-10 ' +
                            'absolute top-0 left-0 w-full h-full leading-tight ' +
                            'bg-gray-100 bg-opacity-0 group-hover:bg-opacity-100 ' +
                            'font-weight-500 text-sm rounded-sm'
                        }
                    >
                        <div>
                            No summary for <strong>{fieldConfig.type}</strong> fields
                        </div>
                    </div>
                </section>
            );
    }
}

export default Field;
