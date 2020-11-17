import React from 'react';
import {icons} from 'assets';

interface CheckboxProps {
    checked: boolean;
    onChange(newValue: boolean): void;
    className?: string;
    disabled?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
    const handleClick = () => {
        if (!props.disabled) {
            props.onChange(!props.checked);
        }
    };

    return (
        <div
            className={
                'w-12 h-12 p-2 transition-colors duration-150 ' +
                (props.disabled
                    ? 'text-gray-500 cursor-not-allowed '
                    : 'text-gray-800 cursor-pointer ') +
                (props.className ? props.className : '')
            }
            onClick={handleClick}
        >
            {props.checked ? icons.checkbox_true : icons.checkbox_false}
        </div>
    );
};

export default Checkbox;
