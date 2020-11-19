import React from 'react';
import {connect} from 'react-redux';
import assert from 'assert';
import {dispatchers, stateTypes} from 'utilities';
import {Button, ButtonRow} from 'components';
import Linker from './linker';

interface Props {
    children: string;
    to?: string;
    onClick?(): void;
    className?: string;
    disabled?: boolean;
    spinning?: boolean;
    closeAllMessages(): void;
    icon?: React.ReactNode;
}
function ButtonLink(props: Props) {
    assert(props.to !== undefined || props.onClick !== undefined);

    return (
        <ButtonRow
            center
            className={props.className !== undefined ? props.className : ''}
        >
            <Linker
                to={props.to}
                onClick={props.onClick}
                closeAllMessages={props.closeAllMessages}
            >
                <Button
                    icon={props.icon}
                    text={props.children}
                    disabled={props.disabled}
                    spinning={props.spinning}
                />
            </Linker>
        </ButtonRow>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ButtonLink);
