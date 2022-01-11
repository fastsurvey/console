import React from 'react';
import {types} from '/src/types';
import {icons} from '/src/assets';

export default function ValidationBar(props: {
    validation: types.ValidationResult;
    showValidState?: boolean;
}) {
    return (
        <div
            className={
                'w-full flex flex-row items-stretch space-x-1.5 ' +
                'px-3 text-justify rounded-b overflow-hidden ' +
                'bg-gray-75 border-gray-150 ' +
                (props.validation.valid ? 'text-green-800 ' : 'text-red-800 ') +
                (props.validation.valid && !props.showValidState
                    ? 'h-0 border-0 '
                    : 'min-h-[2.5rem] border-t ')
            }
            data-cy={`validation-bar ${
                props.validation.valid ? 'isvalid' : 'isinvalid'
            }`}
        >
            <div className='flex flex-row items-center'>
                <div
                    className={
                        'flex-shrink-0 w-2.5 h-2.5 ' +
                        (props.validation.valid
                            ? 'svg-validation-green '
                            : 'svg-validation-red ')
                    }
                >
                    {icons.circle}
                </div>
            </div>
            <div
                className='flex items-center py-1.5 text-base leading-tight text-left md:text-sm font-weight-600'
                data-cy='message'
            >
                {props.validation.valid ? 'Valid' : props.validation.message}
            </div>
        </div>
    );
}
