import React, {useRef} from 'react';
import {icons} from '@assets';
import {styleUtils} from '@utilities';
import {types} from '@types';

interface Props {
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
}
function EditorFormCard(props: Props) {
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
                'relative centering-col w-full shadow-md rounded ' +
                props.className
            }
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
                        'pointer-events-none md:pointer-events-auto'
                    }
                    onClick={toggle}
                >
                    <div className='w-6 h-6 p-0.5 ml-2 mr-2 flex-shrink-0'>
                        {props.icon}
                    </div>
                    <div className='flex flex-col items-start justify-start md:flex-row'>
                        <div className='mb-0.5 font-weight-700'>
                            {props.label}
                        </div>
                        {props.longLabel && (
                            <div className='leading-tight opacity-70 font-weight-500'>
                                <span className='hidden md:inline'>{' -'}</span>
                                {props.longLabel}
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex-grow' />

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
                        (props.collapse ? 'h-0 overflow-hidden ' : 'py-2 ')
                    }
                >
                    {props.children}
                </div>
                {props.validation && (
                    <div
                        className={
                            'w-full px-3 text-justify flex-row-left space-x-3 ' +
                            'rounded-b bg-gray-50 border-gray-200 ' +
                            (props.validation.valid
                                ? 'text-green-900 h-0 overflow-hidden border-0 '
                                : 'text-red-900 min-h-12 md:min-h-[2.5rem] border-t-2 py-2 ')
                        }
                    >
                        <div
                            className={
                                'flex-shrink-0 w-5 h-5 ' +
                                (props.validation.valid
                                    ? 'icon-dark-green '
                                    : 'icon-dark-red ')
                            }
                        >
                            {props.validation.valid
                                ? icons.checkCircle
                                : icons.closeCircle}
                        </div>
                        <div className='text-base text-left md:text-sm font-weight-600'>
                            {props.validation.valid
                                ? 'Valid'
                                : props.validation.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditorFormCard;
