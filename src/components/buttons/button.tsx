import React from 'react';

export default function Button(props: {
    text: string;
    icon?: React.ReactNode;
    onClick?(): void;
    variant?: 'flat-light-blue' | 'flat-light-red';
    disabled?: boolean;
    loading?: boolean;
}) {
    const {text, icon, onClick, variant, disabled, loading} = props;

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
                'p-0.5 rounded flex-row-center h-8 ' +
                'no-selection ringable relative overflow-hidden ' +
                variantClasses
            }
            onClick={onClick && !disabled ? onClick : () => {}}
            disabled={disabled || loading ? disabled || loading : false}
        >
            {icon && <div className='p-1 -mr-1.5 w-7 h-7 z-0'>{icon}</div>}
            {loading && (
                <div
                    className={
                        'flex-row-center text-gray-900 font-weight-600 ' +
                        'absolute top-0 left-0 w-full h-full bg-white ' +
                        'backdrop-filter backdrop-blur-[2.5px] z-10 ' +
                        'space-x-0.5 '
                    }
                >
                    ...
                </div>
            )}

            <div className={'font-weight-600 px-2.5 z-0'}>{text}</div>
        </button>
    );
}
