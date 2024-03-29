import React from 'react';

export default function Button(props: {
    text?: string;
    icon?: React.ReactNode;
    onClick?(): void;
    variant?: 'flat-light-blue' | 'flat-light-red';
    disabled?: boolean;
    loading?: boolean;
    'data-cy'?: string;
}) {
    const {text, icon, onClick, variant, disabled, loading} = props;

    let variantClasses: string;
    let loadingClasses: string;
    switch (variant) {
        case 'flat-light-blue':
            variantClasses = disabled
                ? 'bg-gray-200 text-gray-400 svg-button-flat-disabled cursor-not-allowed '
                : 'bg-blue-50 text-blue-900 svg-button-flat-light-blue hover:bg-blue-100';
            loadingClasses = 'bg-blue-100 text-blue-900 svg-button-flat-light-blue';
            break;
        case 'flat-light-red':
            variantClasses = disabled
                ? 'bg-gray-200 text-gray-400 svg-button-flat-disabled cursor-not-allowed '
                : 'bg-red-50 text-red-900 svg-button-flat-light-red hover:bg-red-100';
            loadingClasses = 'bg-red-100 text-red-900 svg-button-flat-light-red';
            break;
        default:
            variantClasses = disabled
                ? 'bg-gray-50 shadow-sm text-gray-700 cursor-not-allowed svg-elevated-button-passive '
                : 'bg-white hover:bg-gray-100 shadow-sm text-blue-900 svg-elevated-button-active ';
            loadingClasses =
                'bg-gray-50 shadow-sm text-blue-900 svg-elevated-button-active';
            break;
    }

    return (
        <button
            className={
                'p-0.5 rounded flex-row-center h-10 md:h-8 flex-shrink-0 ' +
                'no-selection ringable relative overflow-hidden ' +
                variantClasses
            }
            onClick={onClick && !disabled ? onClick : () => {}}
            disabled={disabled || loading ? disabled || loading : false}
            data-cy={props['data-cy']}
        >
            {icon && (
                <div
                    className={
                        'p-2 w-9 h-9 z-0  ' +
                        (text !== undefined ? '-mr-2.5 hidden sm:block' : ' ')
                    }
                >
                    {icon}
                </div>
            )}
            {loading && (
                <div
                    className={
                        'flex-row-center space-x-0.5 font-weight-600 ' +
                        'absolute top-0 left-0 w-full h-full rounded ' +
                        'backdrop-filter backdrop-blur-[2.5px] z-10 ' +
                        loadingClasses
                    }
                >
                    ...
                </div>
            )}
            {text !== undefined && (
                <div className={'font-weight-600 px-2.5 z-0 text-sm sm:text-base'}>
                    {text}
                </div>
            )}
        </button>
    );
}
