import React from 'react';
import {Link} from 'react-router-dom';
import assert from 'assert';
import Button from '../buttons/Button';
import ButtonRow from '../buttons/ButtonRow';
import {closeAllMessagesAction} from '../../utilities/reduxActions';
import {connect} from 'react-redux';
import {ReduxState} from '../../utilities/types';

interface ButtonLinkProps {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
    disabled?: boolean;
    spinning?: boolean;
    closeAllMessages(): void;
    icon?: React.ReactNode;
}

function ButtonLink(props: ButtonLinkProps) {
    assert(props.to !== undefined || props.onClick !== undefined);

    const button = (
        <Button
            icon={props.icon}
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
            {props.to !== undefined && (
                <Link
                    to={props.to}
                    onClick={() => {
                        props.closeAllMessages();
                        if (props.onClick !== undefined) {
                            props.onClick();
                        }
                    }}
                >
                    {button}
                </Link>
            )}
            {props.to === undefined && (
                <div
                    onClick={() => {
                        props.closeAllMessages();
                        if (props.onClick !== undefined) {
                            props.onClick();
                        }
                    }}
                >
                    {button}
                </div>
            )}
        </ButtonRow>
    );
}

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ButtonLink);
