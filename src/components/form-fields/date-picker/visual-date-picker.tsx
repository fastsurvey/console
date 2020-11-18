import React from 'react';
import formOptions from 'utilities/constants/form-options';
import {DropDown} from 'components';

interface Props {
    disabled?: boolean;
    date: Date;
    getDaysInMonth(year: number, month: number): void;
    changeDay(newValue: number): void;
    changeMonth(newValue: number): void;
    changeYear(newValue: number): void;
    changeTime(newHours: number, newMinutes: number): void;
}
function VisualDatePicker(props: Props) {
    const commonProps = {
        disabled: props.disabled,
        hideChevron: true,
    };

    const DAYS_IN_MONTH = props.getDaysInMonth(
        props.date.getFullYear(),
        props.date.getMonth(),
    );
    const DAYS = [...Array(DAYS_IN_MONTH).keys()].map((i) => {
        return {label: (i + 1).toString(), value: i + 1};
    });

    return (
        <React.Fragment>
            <div className='mr-2 w-14'>
                <DropDown
                    {...commonProps}
                    value={props.date.getDate()}
                    onChange={props.changeDay}
                    options={DAYS}
                />
            </div>
            {DateSeparator('.')}
            <div className='mx-2 w-36'>
                <DropDown
                    {...commonProps}
                    value={props.date.getMonth()}
                    onChange={props.changeMonth}
                    options={formOptions.MONTHS}
                />
            </div>
            {DateSeparator('.')}
            <div className='ml-2 mr-8 w-22'>
                <DropDown
                    {...commonProps}
                    value={props.date.getFullYear()}
                    onChange={props.changeYear}
                    options={formOptions.YEARS}
                />
            </div>
            <div className='mx-2 w-14'>
                <DropDown
                    {...commonProps}
                    value={props.date.getHours()}
                    onChange={(newValue: number) => {
                        props.changeTime(newValue, props.date.getMinutes());
                    }}
                    options={formOptions.HOURS}
                />
            </div>
            {DateSeparator(':')}
            <div className='ml-2 w-14'>
                <DropDown
                    {...commonProps}
                    value={props.date.getMinutes()}
                    onChange={(newValue: number) => {
                        props.changeTime(props.date.getHours(), newValue);
                    }}
                    options={formOptions.MINUTES}
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

export default VisualDatePicker;
