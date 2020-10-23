import React from 'react';
import {closeMessageAction} from '../utilities/reduxActions';
import {ReduxState, Message} from '../utilities/types';
import {connect} from 'react-redux';

interface MessageComponentProps {
    content: string | React.ReactNode;
    close(): void;
}

function MessageComponent(props: MessageComponentProps) {
    return <div className='p-2 m-2 bg-gray-200'>{props.content}</div>;
}

interface MessageQueueComponentProps {
    messages: Message[];
    closeMessage(index: number): void;
}

function MessageQueueComponent(props: MessageQueueComponentProps) {
    return (
        <div className='fixed top-0 right-0'>
            {props.messages.map((message: Message, index: number) => (
                <MessageComponent
                    content={message.content}
                    close={() => props.closeMessage(index)}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    messages: state.messages,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeMessage: (index: number) => dispatch(closeMessageAction(index)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageQueueComponent);
