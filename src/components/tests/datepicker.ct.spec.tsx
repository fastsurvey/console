import React, {useState} from 'react';
import {mount} from '@cypress/react';
import Datepicker from '../form/date-picker/date-picker';
import '/src/styles/tailwind.out.css';

export function DatepickerStateWrapper(props: {
    initialTimestamp: number | null;
    disabled: boolean;
    type: 'start' | 'end';
}) {
    const [timestamp, setTimestamp] = useState<number | null>(props.initialTimestamp);

    return (
        <div className='w-full h-full px-6 py-12 bg-gray-100'>
            <Datepicker
                timestamp={timestamp}
                setTimestamp={setTimestamp}
                disabled={props.disabled}
                data-cy='some-value-for-data-cy'
                type={props.type}
            />
        </div>
    );
}

it('open and close dropdown', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});

it('toggle buttons on start datepicker', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});

it('toggle buttons on end datepicker', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});

it('calendar picker', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});

it('hour picker', () => {
    mount(
        <DatepickerStateWrapper
            initialTimestamp={1550000000}
            disabled={true}
            type={'start'}
        />,
    );
});
