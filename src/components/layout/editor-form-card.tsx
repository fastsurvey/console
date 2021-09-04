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
                    className='flex flex-row self-stretch flex-grow cursor-pointer'
                    onClick={toggle}
                >
                    <div className='w-10 h-10 p-2 ml-1'>{props.icon}</div>
                    <div className=''>{props.label}</div>
                    {props.longLabel && (
                        <div className='pl-2 opacity-70 font-weight-500'>
                            - {props.longLabel}
                        </div>
                    )}
                    <div className='self-stretch flex-grow' />
                </div>

                <div className={'relative flex flex-row group '}>
                    <div
                        className={
                            'absolute top-0 left-0 transform -translate-x-full ' +
                            'h-10 pr-2 text-sm leading-10 font-weight-600 ' +
                            'pointer-events-none whitespace-nowrap opacity-0 ' +
                            'group-hover:opacity-100 group-focus-within:opacity-100'
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
                        (props.collapse ? 'h-0 overflow-hidden ' : ' ')
                    }
                >
                    {props.children}
                </div>
                {props.validation && (
                    <div
                        className={
                            'w-full px-3 flex-row-left space-x-2 ' +
                            'rounded-b text-justify ' +
                            (props.collapse || props.validation.valid
                                ? 'h-0 overflow-hidden mt-2 '
                                : 'border-t-2 h-10 mt-3 ') +
                            (props.validation.valid
                                ? 'text-green-500 bg-green-50 border-green-100 '
                                : 'text-red-400 bg-red-50 border-red-100 ')
                        }
                    >
                        <div
                            className={
                                'flex-shrink-0 w-5 h-5 ' +
                                (props.validation.valid
                                    ? 'icon-green '
                                    : 'icon-red ')
                            }
                        >
                            {props.validation.valid
                                ? icons.checkCircle
                                : icons.closeCirlce}
                        </div>
                        <div className='text-sm text-left font-weight-600'>
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
