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
                'w-full px-2.5 text-justify flex-row-left space-x-3 md:space-x-2 ' +
                'rounded-b bg-gray-50 border-gray-200 overflow-hidden ' +
                (props.validation.valid
                    ? 'text-green-900 '
                    : 'text-red-900 min-h-12 md:min-h-[2.5rem] border-t-2 py-2 ') +
                (props.showValidState !== true
                    ? 'h-0 border-0 '
                    : 'min-h-12 md:min-h-[2.5rem] border-t-2 py-2 ')
            }
            data-cy={`validation-bar ${
                props.validation.valid ? 'isvalid' : 'isinvalid'
            }`}
        >
            <div
                className={
                    'flex-shrink-0 w-5 h-5 ' +
                    (props.validation.valid ? 'icon-dark-green ' : 'icon-dark-red ')
                }
            >
                {props.validation.valid ? icons.checkCircle : icons.closeCircle}
            </div>
            <div
                className='text-base text-left md:text-sm font-weight-600'
                data-cy='message'
            >
                {props.validation.valid ? 'Valid' : props.validation.message}
            </div>
        </div>
    );
}
