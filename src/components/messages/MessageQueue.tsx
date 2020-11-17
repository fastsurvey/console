import React from 'react';
import {connect} from 'react-redux';

import dispatcher from '../../utilities/dispatcher';
import stateTypes from '../../utilities/types/stateTypes';

import MessageComponent from './MessageComponent';

interface MessageQueueProps {
    messages: stateTypes.Message[];
    closeMessage(content: string): void;
}

function MessageQueue(props: MessageQueueProps) {
    return (
        <div className='fixed bottom-0 z-30 mx-0 w-100vw md:mx-20vw md:w-60vw xl:w-30vw xl:mx-35vw'>
            {props.messages.map(
                (message: stateTypes.Message, index: number) => (
                    <MessageComponent
                        key={message.text}
                        message={message}
                        close={() => props.closeMessage(message.text)}
                    />
                ),
            )}
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    messages: state.messages,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeMessage: dispatcher.closeMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageQueue);
