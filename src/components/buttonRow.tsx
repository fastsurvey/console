import React, {ReactNode} from 'react';

interface ButtonRowComponentProps {
    children: ReactNode;
    center?: boolean;
}

function ButtonRowComponent(props: ButtonRowComponentProps) {
    return (
        <div
            className={
                'relative gap-x-4 flex flex-row items-center ' +
                (props.center ? 'justify-center' : 'justify-start')
            }
        >
            {props.children}
        </div>
    );
}

export default ButtonRowComponent;
