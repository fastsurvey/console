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
                'w-12 h-12 p-2 transition-colors duration-150 ' +
                (props.disabled
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-800 cursor-pointer ') +
                (props.className ? props.className : '')
            }
            onClick={() => {
                if (!props.disabled) {
                    props.onChange(!props.checked);
                }
            }}
        >
            {props.checked ? ICONS.checkbox_true : ICONS.checkbox_false}
        </div>
    );
});

export default Checkbox;
