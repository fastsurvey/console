import React, {useState} from 'react';
import Datepicker from '../../form/date-picker/date-picker';
import '/src/styles/tailwind.out.css';

export function DatepickerStateWrapper(props: {
    initialTimestamp: number | null;
    disabled: boolean;
    type: 'start' | 'end';
}) {
    const [timestamp, setTimestamp] = useState<number | null>(props.initialTimestamp);

    return (
        <div className='w-full h-full px-6 py-12 bg-gray-150'>
            <div className='p-4 bg-white rounded shadow-sm'>
                <Datepicker
                    timestamp={timestamp}
                    setTimestamp={setTimestamp}
                    disabled={props.disabled}
                    data-cy={`${props.type}-datepicker`}
                    type={props.type}
                />
            </div>
        </div>
    );
}
