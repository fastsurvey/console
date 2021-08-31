import React from 'react';

export default function Button(props: {
    text: string;
    icon?: React.ReactNode;
    onClick?(): void;
    variant?: 'flat-light-blue' | 'flat-light-red';
    disabled?: boolean;
}) {
    const {text, icon, onClick, variant, disabled} = props;

    let variantClasses: string;
    switch (variant) {
        case 'flat-light-blue':
            variantClasses = disabled
                ? 'bg-gray-200 text-gray-400 icon-gray cursor-not-allowed '
                : 'bg-blue-50 text-blue-900 icon-dark-blue hover:bg-blue-100';
            break;
        case 'flat-light-red':
            variantClasses = disabled
                ? 'bg-gray-200 text-gray-400 icon-gray cursor-not-allowed '
                : 'bg-red-50 text-red-900 icon-dark-red hover:bg-red-100';
            break;
        default:
            variantClasses =
                'bg-white hover:bg-gray-100 shadow text-blue-900 icon-blue';
            break;
    }

    return (
        <button
            className={
                'p-0.5 rounded centering-row h-8 ' +
                'no-selection ringable ' +
                variantClasses
            }
            onClick={onClick && !disabled ? onClick : () => {}}
            disabled={disabled ? disabled : false}
        >
            {icon && <div className='p-1 -mr-1.5 w-7 h-7'>{icon}</div>}

            <div className={'font-weight-600 px-2.5'}>{text}</div>
        </button>
    );
}
