import React from 'react';
import {Link} from 'react-router-dom';
import assert from 'assert';
import Button from '../buttons/Button';
import ButtonRow from '../buttons/ButtonRow';

interface ButtonLinkProps {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
    disabled?: boolean;
    spinning?: boolean;
}

function ButtonLink(props: ButtonLinkProps) {
    assert(props.to !== undefined || props.onClick !== undefined);

    const button = (
        <Button
            text={props.children}
            disabled={props.disabled}
            spinning={props.spinning}
        />
    );

    return (
        <ButtonRow
            center
            className={props.className !== undefined ? props.className : ''}
        >
            {props.to !== undefined && props.onClick === undefined && (
                <Link to={props.to}>{button}</Link>
            )}
            {props.to !== undefined && props.onClick !== undefined && (
                <Link to={props.to} onClick={props.onClick}>
                    {button}
                </Link>
            )}
            {props.to === undefined && props.onClick !== undefined && (
                <div onClick={props.onClick}>{button}</div>
            )}
        </ButtonRow>
    );
}

export default ButtonLink;
