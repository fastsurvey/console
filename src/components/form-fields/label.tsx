import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}
const Label = (props: Props) => (
    <div
        className={
            'h-12 mr-4 text-xl text-right leading-12 ' +
            `font-weight-600 ${props.className}`
        }
    >
        {props.children}
    </div>
);

export default Label;
