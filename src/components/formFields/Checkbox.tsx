import React from 'react';
import {ICONS} from '../../assets/icons/icons';

interface CheckboxProps {
    checked: boolean;
    onChange(newValue: boolean): void;
    className?: string;
    disabled?: boolean;
}

const Checkbox = React.forwardRef((props: CheckboxProps, ref: any) => {
    return (
        <div
            className={
                'relative h-12 w-12 p-2' +
                'font-weight-500 text-lg text-gray-800 no-selection ' +
                (props.className ? props.className : '')
            }
            onClick={() => {
                if (!props.disabled) {
                    props.onChange(!props.checked);
                }
            }}
        >
            <div
                className={
                    'w-8 h-8 ' + (props.disabled ? 'bg-gray-200 rounded ' : '')
                }
            >
                {props.checked ? ICONS.checkbox_true : ICONS.checkbox_false}
            </div>
        </div>
    );
});

export default Checkbox;
