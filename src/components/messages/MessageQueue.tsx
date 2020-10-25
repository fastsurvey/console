import React from 'react';
import {closeMessageAction} from '../../utilities/reduxActions';
import {ReduxState, Message} from '../../utilities/types';
import {connect} from 'react-redux';
import MessageComponent from './Message';

interface MessageQueueProps {
    messages: Message[];
    closeMessage(content: string): void;
}

function MessageQueue(props: MessageQueueProps) {
    return (
        <div className='fixed bottom-0 w-30vw mx-35vw'>
            {props.messages.map((message: Message, index: number) => (
                <MessageComponent
                    key={message}
                    text={message}
                    close={() => props.closeMessage(message)}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    messages: state.messages,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeMessage: (text: string) => dispatch(closeMessageAction(text)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageQueue);
