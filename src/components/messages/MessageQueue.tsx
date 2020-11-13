import React from 'react';
import {closeMessageAction} from '../../utilities/reduxActions';
import {ReduxState, Message} from '../../utilities/types';
import {connect} from 'react-redux';
import MessageComponent from './MessageComponent';

interface MessageQueueProps {
    messages: Message[];
    closeMessage(content: string): void;
}

function MessageQueue(props: MessageQueueProps) {
    return (
        <div className='fixed bottom-0 z-30 mx-0 w-100vw md:mx-20vw md:w-60vw xl:w-30vw xl:mx-35vw'>
            {props.messages.map((message: Message, index: number) => (
                <MessageComponent
                    key={message.text}
                    message={message}
                    close={() => props.closeMessage(message.text)}
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
