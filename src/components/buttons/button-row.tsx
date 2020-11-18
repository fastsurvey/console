import React, {ReactNode} from 'react';

interface Props {
    children: ReactNode;
    center?: boolean;
    className?: string;
}
function ButtonRow(props: Props) {
    return (
        <div
            className={
                'relative gap-x-4 flex flex-row items-center ' +
                (props.center ? 'justify-center' : 'justify-start') +
                ' ' +
                (props.className ? props.className : '')
            }
        >
            {props.children}
        </div>
    );
}

export default ButtonRow;
