import React from 'react';

export default function TextArea(props: {
    value: string;
    setValue(v: string): void;
    disabled?: boolean;
}) {
    const {value, setValue} = props;

    function handleKeydown(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            // @ts-ignore
            e.target.blur();
        }
    }

    return (
        <textarea
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeydown}
            className={
                'w-full px-3 py-1.5  rounded min-h-[5rem] ringable font-weight-500 ' +
                (props.disabled
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                    : 'bg-gray-100 text-gray-800 ')
            }
            disabled={props.disabled === true}
        />
    );
}
