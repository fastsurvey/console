import React from 'react';
import icons from 'assets/icons/icons';

interface CheckboxProps {
    checked: boolean;
    onChange(newValue: boolean): void;
    className?: string;
    disabled?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
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
            {props.checked ? icons.checkbox_true : icons.checkbox_false}
        </div>
    );
};

export default Checkbox;
