import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    to?: string;
    onClick?(): void;
    closeAllMessages(): void;
    children: React.ReactNode;
}
function Linker(props: Props) {
    if (props.to !== undefined) {
        return (
            <Link
                to={props.to}
                onClick={() => {
                    props.closeAllMessages();
                    if (props.onClick !== undefined) {
                        props.onClick();
                    }
                }}
            >
                {props.children}
            </Link>
        );
    } else {
        return (
            <div
                onClick={() => {
                    props.closeAllMessages();
                    if (props.onClick !== undefined) {
                        props.onClick();
                    }
                }}
            >
                {props.children}
            </div>
        );
    }
}

export default Linker;
