import React from 'react';

function VisualTimePill(props: {
    variant: 'pending' | 'running' | 'finished';
    phrase: string;
    flat?: boolean;
    shrinkOnMobile?: boolean;
}) {
    let colorClasses: string;
    switch (props.variant) {
        case 'pending':
            colorClasses =
                (props.shrinkOnMobile
                    ? 'bg-yellow-300 sm:bg-yellow-100 '
                    : 'bg-yellow-75 ') + 'text-yellow-700 ';
            break;
        case 'running':
            colorClasses =
                (props.shrinkOnMobile
                    ? 'bg-green-300 sm:bg-green-100 '
                    : 'bg-green-75 ') + 'text-green-700 ';
            break;
        case 'finished':
            colorClasses =
                (props.shrinkOnMobile ? 'bg-gray-300 sm:bg-gray-200 ' : 'bg-gray-50 ') +
                'text-gray-600 ';
            break;
    }
    return (
        <div
            className={
                'rounded-sm font-weight-600 text-sm no-selection ' +
                colorClasses +
                (!props.flat ? 'shadow-sm ' : ' ') +
                (props.shrinkOnMobile ? 'p-1.5 sm:px-2.5 sm:py-0.5 ' : 'px-2.5 py-0.5 ')
            }
            data-cy={`time-pill ${props.variant}`}
        >
            <span className={props.shrinkOnMobile ? 'hidden sm:block' : ''}>
                {props.phrase}
            </span>
        </div>
    );
}

export default VisualTimePill;
