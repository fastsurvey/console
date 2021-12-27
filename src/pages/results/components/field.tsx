import React, {useState} from 'react';
import {types} from '/src/types';
import SelectionResults from './field-results/selection-results';
import {styleUtils} from '/src/utilities';
import {MarkdownContent} from '/src/components/layout/markdown-content';
import {icons} from '/src/assets';

function Field(props: {
    identifierToOrder: {[key: string]: number};
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    results: types.SurveyResults;
}) {
    const {fieldIndex, fieldConfig, results} = props;

    const [markdownOpen, setMarkdownOpen] = useState(false);

    if (fieldConfig.type === 'break') {
        return (
            <div
                className={
                    'w-full flex-row-center no-selection ' +
                    'font-weight-600 text-base leading-10 ' +
                    styleUtils.color.fieldTypeToClasses('break')
                }
            >
                <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0'>
                    {styleUtils.icons.fieldTypeToIcon(fieldConfig.type)}
                </div>
                <div
                    className={
                        'flex flex-col items-start justify-start md:flex-row md:items-center '
                    }
                >
                    <div className='flex-shrink-0 mb-2 mr-3 capitalize md:mb-0 font-weight-600 whitespace-nowrap'>
                        Page Break
                    </div>
                </div>
                <div className='flex-grow h-0 translate-y-px border-b-2 border-gray-300 border-dashed' />
            </div>
        );
    }

    if (fieldConfig.type === 'markdown') {
        return (
            <div
                className={
                    'w-full flex-col-left ' +
                    (markdownOpen ? 'bg-white rounded shadow ' : ' ')
                }
            >
                <div
                    className={
                        'w-full flex-row-center no-selection rounded-t ' +
                        'font-weight-600 text-base leading-10 group ' +
                        (markdownOpen
                            ? styleUtils.color.fieldTypeToClasses('markdown')
                            : styleUtils.color.fieldTypeToClasses('break')) +
                        ' cursor-pointer ' +
                        (markdownOpen ? 'hover:text-rose-600 ' : 'hover:text-gray-900 ')
                    }
                    onClick={() => setMarkdownOpen(!markdownOpen)}
                >
                    <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0'>
                        {styleUtils.icons.fieldTypeToIcon(fieldConfig.type)}
                    </div>
                    <div
                        className={
                            'flex flex-col items-start justify-start md:flex-row md:items-center '
                        }
                    >
                        <div className='flex-shrink-0 mb-2 mr-3 capitalize md:mb-0 font-weight-600 whitespace-nowrap'>
                            {fieldConfig.type === 'markdown'
                                ? 'Markdown Content'
                                : 'Page Break'}
                        </div>
                    </div>
                    <div
                        className={
                            'flex-grow h-0 translate-y-px ' +
                            'border-gray-300 group-hover:border-gray-400 ' +
                            (!markdownOpen ? 'border-b-2 border-dashed ' : '')
                        }
                    />
                    <div
                        className={
                            'w-7 h-7 p-0.5 my-1.5 ml-1 transform cursor-pointer ' +
                            'opacity-70 group-hover:opacity-100 rounded ringable-dark ' +
                            (!markdownOpen ? ' ' : 'rotate-180 ')
                        }
                    >
                        {icons.chevronDown}
                    </div>
                    <div
                        className={
                            'h-0 translate-y-px w-2 ' +
                            (!markdownOpen
                                ? 'border-b-2 border-gray-300 border-dashed'
                                : '')
                        }
                    />
                </div>
                {markdownOpen && fieldConfig.type === 'markdown' && (
                    <MarkdownContent content={fieldConfig.description} />
                )}
            </div>
        );
    }

    // @ts-ignore
    const fieldResults: any = results[fieldConfig.identifier].value;
    // @ts-ignore
    const fieldCount: any = results[fieldConfig.identifier].count;

    const summaryProps: any = {
        fieldConfig: fieldConfig,
        fieldResults: fieldResults,
        count: fieldCount,
    };

    // TODO: Trucate field description accordingly (maybe show at most n lines)

    const fieldLabel = `${props.identifierToOrder[fieldConfig.identifier]}. ${
        fieldConfig.description
    }`;

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
                <h2
                    className='text-base text-gray-900 font-weight-700'
                    data-cy='description'
                >
                    {fieldLabel}{' '}
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
        case 'selection':
            return (
                <VisualField
                    subtitle={`choose between ${fieldConfig.min_select} and ${fieldConfig.max_select} options`}
                >
                    <SelectionResults {...summaryProps} />
                </VisualField>
            );
        case 'text':
        case 'email':
            return (
                <section
                    className={
                        'w-full px-4 py-2.5 text-gray-800 rounded relative group cursor-not-allowed ' +
                        'border-2 border-gray-300 border-dashed flex-col-left text-left'
                    }
                    data-cy={`field-container-${fieldIndex} isnotaggregated`}
                >
                    <h2
                        className='w-full text-base text-gray-600 font-weight-700'
                        data-cy='description'
                    >
                        {fieldLabel}{' '}
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
        default:
            throw `Invalid field config: ${fieldConfig}`;
    }
}

export default Field;
