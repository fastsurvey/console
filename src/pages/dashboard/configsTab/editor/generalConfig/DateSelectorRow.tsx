import React from 'react';
import DropDown from '../../../../../components/formFields/DropDown';
import {DAYS, MONTHS, YEARS, HOURS, MINUTES} from '../constants';

interface DateSelectorProps {
    date: any;
}
function DateSelector(props: DateSelectorProps) {
    return (
        <React.Fragment>
            <div className='mr-2 w-14'>
                <DropDown
                    value={props.date.getDate()}
                    onChange={() => {}}
                    options={DAYS}
                    hideChevron
                />
            </div>
            {DateSeparator('.')}
            <div className='mx-2 w-36'>
                <DropDown
                    value={props.date.getMonth()}
                    onChange={() => {}}
                    options={MONTHS}
                    hideChevron
                />
            </div>
            {DateSeparator('.')}
            <div className='ml-2 mr-8 w-22'>
                <DropDown
                    value={props.date.getYear()}
                    onChange={() => {}}
                    options={YEARS}
                    hideChevron
                />
            </div>
            <div className='mx-2 w-14'>
                <DropDown
                    value={props.date.getHours()}
                    onChange={() => {}}
                    options={HOURS}
                    hideChevron
                />
            </div>
            {DateSeparator(':')}
            <div className='ml-2 w-14'>
                <DropDown
                    value={props.date.getMinutes()}
                    onChange={() => {}}
                    options={MINUTES}
                    hideChevron
                />
            </div>
        </React.Fragment>
    );
}

const DateSeparator = (char: string) => (
    <div className='h-12 text-lg text-gray-800 leading-12 font-weight-700'>
        {char}
    </div>
);

export default DateSelector;
