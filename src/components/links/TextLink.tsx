import React from 'react';
import {Link} from 'react-router-dom';
import assert from 'assert';

interface TextLinkProps {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
}

function TextLink(props: TextLinkProps) {
    assert(props.to !== undefined || props.onClick !== undefined);

    return (
        <div
            className={
                'w-full text-center text-gray-500 ' +
                'font-weight-500 no-selection cursor-pointer ' +
                (props.className !== undefined ? props.className : '')
            }
        >
            {props.to !== undefined && props.onClick === undefined && (
                <Link to={props.to}>{props.children}</Link>
            )}
            {props.to !== undefined && props.onClick !== undefined && (
                <Link to={props.to} onClick={props.onClick}>
                    {props.children}
                </Link>
            )}
            {props.to === undefined && props.onClick !== undefined && (
                <div onClick={props.onClick}>{props.children}</div>
            )}
        </div>
    );
}

export default TextLink;
