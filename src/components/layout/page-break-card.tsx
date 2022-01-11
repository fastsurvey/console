import React from 'react';
import {icons} from '/src/assets';
import {styleUtils} from '/src/utilities';

function PageBreakCard(props: {
    removeField(): void;
    actionLabel: string;
    setActionLabel(newLabel: string): void;
    disabled: boolean;
    'data-cy': string;
}) {
    return (
        <div data-cy={props['data-cy']} className='w-full py-12 -my-12'>
            <div
                className={
                    'w-full flex-row-center no-selection -my-2 ' +
                    'font-weight-600 text-base leading-10 ' +
                    'text-gray-700'
                }
            >
                <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0 svg-field-gray'>
                    {styleUtils.icons.fieldTypeToIcon('break')}
                </div>
                <div
                    className={
                        'flex flex-col items-start justify-start md:flex-row md:items-center '
                    }
                >
                    <div className='flex-shrink-0 mr-2 capitalize md:mb-0 font-weight-600 whitespace-nowrap'>
                        Page Break
                    </div>
                </div>
                <div className='flex-grow h-0 translate-y-px border-b-2 border-gray-300 border-dashed' />

                <button
                    className='w-7 h-7 p-1 my-1.5 mx-0.5 opacity-60 hover:opacity-100 rounded ringable-dark svg-field-action-gray '
                    onClick={props.disabled ? () => {} : props.removeField}
                    data-cy='button-remove '
                    disabled={props.disabled}
                >
                    {icons.trash}
                </button>
                <div className='w-[2.375rem] h-0 translate-y-px border-b-2 border-gray-300 border-dashed' />
            </div>
        </div>
    );
}

export default PageBreakCard;
