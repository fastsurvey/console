import React from 'react';

const TextArea = React.forwardRef(
    (
        props: {
            value: string;
            setValue(v: string): void;
            disabled?: boolean;
            'data-cy'?: string;
        },
        ref?: any,
    ) => {
        const {value, setValue} = props;

        function handleKeydown(e: React.KeyboardEvent) {
            if (e.key === 'Escape') {
                // @ts-ignore
                e.target.blur();
            }
        }

        return (
            <textarea
                ref={ref}
                rows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeydown}
                className={
                    'w-full px-3 py-1.5 rounded min-h-[5rem] ringable font-weight-500 z-0 ' +
                    (props.disabled
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                        : 'bg-gray-100 text-gray-800 ')
                }
                disabled={props.disabled === true}
                data-cy={props['data-cy']}
            />
        );
    },
);

export default TextArea;
