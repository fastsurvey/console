import React, {useState} from 'react';
import VisualDropDown from './visual-drop-down';

interface Props {
    options: {label: string; value: number}[];
    value: number;
    className?: string;
    hideChevron?: boolean;
    disabled?: boolean;
    onChange(newValue: number): void;
    onEnter?(): void;
}
const DropDown = (props: Props) => {
    const [isOpen, setOpen] = useState(false);
    const [zIndex, setZIndex] = useState('z-10');

    function handleKeyDown(e: any) {
        if (['Escape', 'Enter'].includes(e.key)) {
            close();
        }
    }

    function close() {
        document.removeEventListener('click', close);
        document.removeEventListener('keydown', handleKeyDown);
        setOpen(false);
        setTimeout(() => setZIndex('z-10'), 200);
    }

    function open() {
        if (!isOpen && !props.disabled) {
            document.addEventListener('click', close);
            document.addEventListener('keydown', handleKeyDown);
            setOpen(true);
            setZIndex('z-20');
        }
    }

    return (
        <VisualDropDown
            activeOption={
                props.options.filter(
                    (option) => option.value === props.value,
                )[0]
            }
            options={props.options}
            hideChevron={props.hideChevron}
            className={props.className}
            disabled={props.disabled}
            isOpen={isOpen}
            zIndex={zIndex}
            open={open}
            onChange={props.onChange}
        />
    );
};

export default DropDown;
