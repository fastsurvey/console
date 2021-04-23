import React from 'react';
import {connect} from 'react-redux';
import assert from 'assert';
import {reduxUtils} from 'utilities';
import Linker from './linker';
import {types} from 'types';

interface Props {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
    closeAllMessages(): void;
}
function TextLink(props: Props) {
    assert(props.to !== undefined || props.onClick !== undefined);

    return (
        <div
            className={
                'w-full text-center text-gray-500 ' +
                'font-weight-500 no-selection cursor-pointer ' +
                (props.className !== undefined ? props.className : '')
            }
        >
            <Linker
                to={props.to}
                onClick={props.onClick}
                closeAllMessages={props.closeAllMessages}
            >
                {props.children}
            </Linker>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TextLink);
