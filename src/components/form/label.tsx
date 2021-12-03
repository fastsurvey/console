import React, {useState} from 'react';
import {icons} from '/src/assets';

export default function Label(props: {text: string; detail?: React.ReactNode}) {
    const [detailIsOpen, setDetailIsOpen] = useState(false);
    const toggleDetail = () => {
        setDetailIsOpen(!detailIsOpen);
    };

    return (
        <div className='z-10 w-full px-1 text-sm text-left text-gray-500 flex-col-left font-weight-600 no-selection'>
            <div className='flex-row-left'>
                <label>{props.text}</label>
                {props.detail !== undefined && (
                    <button
                        className={
                            'w-9 h-7 px-2 py-1 md:w-6 md:h-6 md:p-1 ' +
                            'svg-label-info cursor-pointer ' +
                            'relative block ringable rounded z-50 ml-0.5'
                        }
                        onClick={toggleDetail}
                    >
                        {detailIsOpen ? icons.closeCircle : icons.information}
                    </button>
                )}
            </div>
            {detailIsOpen && (
                <div
                    className={
                        ' p-3 w-[24rem] max-w-full mb-1 rounded ' +
                        'bg-gray-800 text-gray-100 ' +
                        'text-sm font-weight-500 text-justify'
                    }
                >
                    {props.detail}
                </div>
            )}
        </div>
    );
}
