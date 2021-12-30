import React from 'react';
import {icons} from '/src/assets';
import {styleUtils} from '/src/utilities';

function PageBreakCard(props: {
    label: string;
    removeField(): void;
    actionLabel: string;
    setActionLabel(newLabel: string): void;
    'data-cy'?: string;
}) {
    return (
        <div
            className={
                'w-full flex-row-center no-selection ' +
                'font-weight-600 text-base leading-10 ' +
                'text-gray-700 svg-field-gray'
            }
        >
            <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0'>
                {styleUtils.icons.fieldTypeToIcon('break')}
            </div>
            <div
                className={
                    'flex flex-col items-start justify-start md:flex-row md:items-center '
                }
            >
                <div className='flex-shrink-0 mb-2 mr-3 capitalize md:mb-0 font-weight-600 whitespace-nowrap'>
                    {props.label}
                </div>
            </div>
            <div className='flex-grow h-0 translate-y-px border-b-2 border-gray-300 border-dashed' />

            <button
                className='w-7 h-7 p-0.5 m-1.5 opacity-70 hover:opacity-100 rounded ringable-dark '
                onClick={props.removeField}
                data-cy='button-remove'
            >
                {icons.trash}
            </button>
            <div className='w-[2.375rem] h-0 translate-y-px border-b-2 border-gray-300 border-dashed' />
        </div>
    );
}

export default PageBreakCard;
