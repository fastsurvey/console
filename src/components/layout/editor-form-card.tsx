import React from 'react';
import {icons} from '/src/assets';
import {styleUtils} from '/src/utilities';
import {types} from '/src/types';
import {ValidationBar} from '/src/components';

const EditorFormCard = React.forwardRef(
    (
        props: {
            label: string;
            mobileLabel?: string;
            children: React.ReactNode;
            buttons?: React.ReactNode;
            icon: React.ReactNode;
            className?: string;
            fieldType?: types.FieldType;

            collapse: boolean;
            setCollapse(v: boolean): void;
            longLabel?: string;
            actionLabel: string;
            setActionLabel(newLabel: string): void;

            validation?: types.ValidationResult;
            'data-cy': string;
        },
        ref: any,
    ) => {
        const toggle = () => {
            props.setCollapse(!props.collapse);
            updateActionlabel(!props.collapse);
        };

        const updateActionlabel = (collapse: boolean | undefined) => {
            props.setActionLabel(collapse ? 'expand' : 'collapse');
        };

        return (
            <div ref={ref} className='w-full py-12 -my-12'>
                <div
                    className={
                        'relative flex-col-center w-full shadow-sm rounded ' +
                        props.className
                    }
                    data-cy={props['data-cy']}
                >
                    <div
                        className={
                            'w-full rounded-t flex-row-center no-selection ' +
                            'font-weight-600 text-base leading-10 ' +
                            styleUtils.color.fieldTypeToClasses(props.fieldType)
                        }
                    >
                        <div
                            className={
                                'w-full flex-row-center cursor-pointer leading-tight py-2 ' +
                                'pointer-events-none md:pointer-events-auto flex-grow'
                            }
                            onClick={toggle}
                        >
                            <div
                                className={
                                    'w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0 ' +
                                    styleUtils.color.fieldTypeToFieldIconClasses(
                                        props.fieldType,
                                    )
                                }
                            >
                                {props.icon}
                            </div>
                            <div
                                className={
                                    'flex flex-col items-baseline justify-start md:flex-row flex-grow gap-y-1 md:gap-y-0 ' +
                                    ' mr-4 md:mr-20 '
                                }
                            >
                                <div
                                    className='flex-shrink-0 hidden mr-3 capitalize truncate md:mb-0 font-weight-600 sm:block'
                                    data-cy='card-label'
                                >
                                    {props.label}
                                </div>
                                <div className='flex-shrink-0 block mr-3 capitalize truncate md:mb-0 font-weight-600 sm:hidden'>
                                    {props.mobileLabel}
                                </div>
                                {props.longLabel !== undefined && (
                                    <div
                                        className='text-sm leading-tight opacity-70 font-weight-500 hyphens line-clamp-3 md:line-clamp-1 sm:line-clamp-2'
                                        data-cy='card-long-label'
                                    >
                                        {props.longLabel}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className={
                                'relative flex flex-row group ' +
                                styleUtils.color.fieldTypeToActionIconClasses(
                                    props.fieldType,
                                )
                            }
                        >
                            <div
                                className={
                                    'absolute top-0 left-0 transform -translate-x-full ' +
                                    'h-10 pr-2 text-sm leading-10 font-weight-600 ' +
                                    'pointer-events-none whitespace-nowrap opacity-0 ' +
                                    'md:group-hover:opacity-100 md:group-focus-within:opacity-100'
                                }
                            >
                                {props.actionLabel}
                            </div>
                            {props.buttons}

                            <button
                                className={
                                    'w-7 h-7 p-0.5 my-1.5 mx-0.5 transform cursor-pointer ' +
                                    'opacity-70 hover:opacity-100 mr-2 rounded ringable-dark ' +
                                    (props.collapse ? ' ' : 'rotate-180 ')
                                }
                                onClick={toggle}
                                onMouseEnter={() => updateActionlabel(props.collapse)}
                                onFocus={() => updateActionlabel(props.collapse)}
                                data-cy={`button-collapse ${
                                    props.collapse ? 'collapsed' : 'expanded'
                                }`}
                            >
                                {icons.chevronDown}
                            </button>
                        </div>
                    </div>
                    <div
                        className={
                            'flex-col-top w-full rounded-b bg-white ' +
                            (props.validation ? 'pt-3 ' : 'py-3 ')
                        }
                        ref={ref}
                    >
                        <div
                            className={
                                'w-full flex-col-center gap-y-6 px-3 ' +
                                (props.collapse
                                    ? 'h-0 p-0 overflow-hidden '
                                    : 'pt-2 pb-3 ')
                            }
                        >
                            {props.children}
                        </div>
                        {props.validation && (
                            <ValidationBar validation={props.validation} />
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

export default EditorFormCard;
