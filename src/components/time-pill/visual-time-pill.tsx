import React from 'react';

function VisualTimePill(props: {
    variant: 'draft' | 'pending' | 'running' | 'finished';
    phrase: string;
    flat?: boolean;
}) {
    let colorClasses: string;
    switch (props.variant) {
        case 'draft':
            colorClasses = 'bg-blue-100 text-blue-700 ';
            break;
        case 'pending':
            colorClasses = 'bg-yellow-100 text-yellow-800 ';
            break;
        case 'running':
            colorClasses = 'bg-green-100 text-green-700 ';
            break;
        case 'finished':
            colorClasses = 'bg-gray-200 text-gray-600 ';
            break;
    }
    return (
        <div
            className={
                'rounded-full px-2.5 py-0.5 font-weight-600 text-sm no-selection ' +
                colorClasses +
                (!props.flat ? 'shadow-md ' : '')
            }
        >
            {props.phrase}
        </div>
    );
}

export default VisualTimePill;
