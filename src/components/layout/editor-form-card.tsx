import React, {useRef} from 'react';
import {icons} from '/src/assets';
import {styleUtils} from '/src/utilities';
import {types} from '/src/types';
import {ValidationBar} from '/src/components';

function EditorFormCard(props: {
    label: string;
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
    'data-cy'?: string;
}) {
    let ref = useRef<HTMLDivElement>(null);

    const toggle = () => {
        props.setCollapse(!props.collapse);
        updateActionlabel(!props.collapse);
    };

    const updateActionlabel = (collapse: boolean | undefined) => {
        props.setActionLabel(collapse ? 'expand' : 'collapse');
    };

    return (
        <div
            className={
                'relative centering-col w-full shadow-md rounded ' + props.className
            }
            data-cy={props['data-cy']}
        >
            <div
                className={
                    'w-full rounded-t centering-row no-selection ' +
                    'font-weight-600 text-base leading-10 ' +
                    styleUtils.color.fieldTypeToClasses(props.fieldType)
                }
            >
                <div
                    className={
                        'flex-row-center cursor-pointer leading-tight py-2 ' +
                        'pointer-events-none md:pointer-events-auto flex-grow'
                    }
                    onClick={toggle}
                >
                    <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0'>
                        {props.icon}
                    </div>
                    <div
                        className={
                            'flex flex-col items-start justify-start md:flex-row md:items-center ' +
                            'flex-grow mr-4 md:mr-20 '
                        }
                    >
                        <div className='flex-shrink-0 mb-2 mr-3 md:mb-0 font-weight-600 whitespace-nowrap'>
                            {props.label}
                        </div>
                        {props.longLabel && (
                            <div className='leading-tight opacity-70 font-weight-500'>
                                {props.longLabel}
                            </div>
                        )}
                    </div>
                </div>

                <div className={'relative flex flex-row group '}>
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
                        data-cy='button-collapse'
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
                        'w-full centering-col gap-y-6 px-3 ' +
                        (props.collapse ? 'h-0 overflow-hidden ' : 'pt-2 pb-3 ')
                    }
                >
                    {props.children}
                </div>
                {props.validation && <ValidationBar validation={props.validation} />}
            </div>
        </div>
    );
}

export default EditorFormCard;
