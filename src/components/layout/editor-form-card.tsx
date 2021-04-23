import React, {useRef, useEffect, useState} from 'react';
import icons from 'assets/icons/icons';
import {colors} from 'utilities';
import {types} from 'types';

interface Props {
    label: string;
    children: React.ReactNode;
    buttons?: React.ReactNode;
    icon: React.ReactNode;
    className?: string;
    color?: types.Color;

    collapse?: boolean;
    setCollapse?(v: boolean): void;
    longLabel?: string;
    actionLabel?: string;
    setActionLabel?(newLabel: string): void;
}
function EditorFormCard(props: Props) {
    let ref = useRef<HTMLDivElement>(null);

    const [overflowHidden, setOverflowHidden] = useState(props.collapse);
    const [overflowTimeout, setOverflowTimeout] = useState<any>(undefined);

    useEffect(() => {
        if (props.collapse) {
            clearTimeout(overflowTimeout);
            setOverflowHidden(true);
        } else {
            clearTimeout(overflowTimeout);
            setOverflowTimeout(
                setTimeout(() => {
                    setOverflowHidden(false);
                }, 300),
            );
        }
        // eslint-disable-next-line
    }, [props.collapse]);

    const toggle = () => {
        if (props.setCollapse) {
            props.setCollapse(!props.collapse);
            updateActionlabel(!props.collapse);
        }
    };

    const updateActionlabel = (collapse: boolean | undefined) => {
        if (props.setActionLabel) {
            props.setActionLabel(collapse ? 'expand' : 'collapse');
        }
    };
    return (
        <div className={'relative flex flex-col w-full ' + props.className}>
            <div
                className={
                    'absolute left-0 right-0 top-0 bottom-0 ' +
                    'rounded shadow-md mr-1 mb-1 z-0 ' +
                    'flex flex-row items-start justify-start ' +
                    'font-weight-600 text-lg leading-10 ' +
                    colors.colorToClasses(props.color)
                }
            >
                <div
                    className='flex flex-row self-stretch flex-grow cursor-pointer'
                    onClick={toggle}
                >
                    <div className='w-10 h-10 p-2 ml-1 opacity-70'>
                        {props.icon}
                    </div>
                    <div className=''>{props.label}</div>
                    {props.longLabel && (
                        <div className='pl-2 opacity-70 font-weight-500'>
                            - {props.longLabel}
                        </div>
                    )}
                    <div className='self-stretch flex-grow' />
                </div>

                <div className='relative flex flex-row group'>
                    <div className='absolute top-0 left-0 h-10 pr-2 text-base leading-10 transform -translate-x-full opacity-0 pointer-events-none font-weight-500 group-hover:opacity-100 whitespace-nowrap'>
                        {props.actionLabel}
                    </div>
                    {props.buttons}
                    {props.collapse !== undefined &&
                        props.setCollapse !== undefined && (
                            <div
                                className={
                                    'w-8 h-10 px-1 py-2 transform cursor-pointer ' +
                                    'opacity-70 hover:opacity-100 mr-2 ' +
                                    'transition-transform duration-200 ' +
                                    (props.collapse
                                        ? 'rotate-0 '
                                        : 'rotate-180 ')
                                }
                                onClick={toggle}
                                onMouseEnter={() =>
                                    updateActionlabel(props.collapse)
                                }
                            >
                                {icons.expand_more}
                            </div>
                        )}
                </div>
            </div>
            <div
                className={
                    'flex flex-col left-0 right-0 min-h-full p-2 pt-4 ml-1 ' +
                    'rounded shadow-md bg-white mt-10 z-10 ' +
                    'transition-size duration-200 ease-linear ' +
                    (overflowHidden
                        ? 'overflow-hidden '
                        : ' overflow-visible ') +
                    (props.collapse ? 'pb-0 max-h-0' : 'pb-2 max-h-100vh')
                }
                ref={ref}
            >
                {props.children}
            </div>
        </div>
    );
}

export default EditorFormCard;
