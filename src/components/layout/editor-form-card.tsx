import React, {useRef, useEffect, useState} from 'react';
import icons from 'assets/icons/icons';
import {colors} from 'utilities';
import {generalTypes} from 'utilities/types/general-types';

interface Props {
    label: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    className?: string;
    color?: generalTypes.Color;

    collapse?: boolean;
    setCollapse?(v: boolean): void;
    longLabel?: string;
}
function EditorFormCard(props: Props) {
    let ref = useRef<HTMLDivElement>(null);

    // Set a way too large start max-height
    // which the div will never reach
    const [maxHeight, setMaxHeight] = useState(1500);

    useEffect(() => {
        if (ref.current) {
            const newMaxHeight = ref.current.clientHeight;
            if (newMaxHeight && newMaxHeight > 40) {
                if (maxHeight === 1500 || newMaxHeight > maxHeight) {
                    setMaxHeight(newMaxHeight);
                }
            }
        }
    }, [maxHeight, ref]);

    useEffect(() => setMaxHeight(1500), [props.label]);

    return (
        <div className={'relative flex flex-col w-full ' + props.className}>
            <div
                className={
                    'absolute left-0 right-0 top-0 bottom-0 ' +
                    'rounded shadow-md mr-1 mb-1 z-0 cursor-pointer ' +
                    'flex flex-row items-start justify-start ' +
                    'font-weight-600 text-lg leading-10 ' +
                    colors.colorToClasses(props.color)
                }
                onClick={() =>
                    props.setCollapse ? props.setCollapse(!props.collapse) : {}
                }
            >
                <div className='w-10 h-10 p-2 ml-1 opacity-70'>
                    {props.icon}
                </div>
                <div className=''>{props.label}</div>
                {props.longLabel && (
                    <div className='ml-2 opacity-70 font-weight-500'>
                        - {props.longLabel}
                    </div>
                )}

                <div className='self-stretch flex-grow' />
                {props.collapse !== undefined &&
                    props.setCollapse !== undefined && (
                        <div
                            className={
                                'w-10 h-10 p-2 transform ' +
                                'transition-transform duration-200 ' +
                                (props.collapse ? 'rotate-0 ' : 'rotate-180 ')
                            }
                        >
                            {icons.expand_more}
                        </div>
                    )}
            </div>
            <div
                className={
                    'flex flex-col left-0 right-0 min-h-full p-2 pt-4 ml-1 ' +
                    'rounded shadow-md bg-white mt-10 z-10 overflow-hidden ' +
                    'transition-size duration-300 ' +
                    (props.collapse ? 'pb-0' : 'pb-2')
                }
                style={{maxHeight: props.collapse ? '0' : `${maxHeight}px`}}
                ref={ref}
            >
                {props.children}
            </div>
        </div>
    );
}

export default EditorFormCard;
