import React from 'react';
import {Link} from 'react-router-dom';
import assert from 'assert';
import stateTypes from '../../utilities/types/stateTypes';
import dispatcher from '../../utilities/dispatcher';
import {connect} from 'react-redux';

interface TextLinkProps {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
    closeAllMessages(): void;
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
                    {props.children}
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
                    {props.children}
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TextLink);
