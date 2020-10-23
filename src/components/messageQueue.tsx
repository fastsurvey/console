import React, {useEffect, useState} from 'react';
import {closeMessageAction} from '../utilities/reduxActions';
import {ReduxState, Message} from '../utilities/types';
import {connect} from 'react-redux';

interface MessageComponentProps {
    content: string | React.ReactNode;
    close(): void;
}

function MessageComponent(props: MessageComponentProps) {
    const [size, setSize] = useState('h-0 py-0');
    const [delay, setDelay] = useState('delay-200');
    const [toBeClosed, setToBeClosed] = useState(false);

    useEffect(() => {
        if (size === 'h-0 py-0' && !toBeClosed) {
            setSize('h-16 py-2');
        }
    });

    function handleClose() {
        setToBeClosed(true);
        setDelay('');
        setSize('h-0 py-0');
        setTimeout(() => {
            props.close();
        }, 300);
    }

    return (
        <div
            className={
                'overflow-hidden px-2 m-2 bg-gray-200 rounded shadow ' +
                size +
                ' ' +
                delay +
                ' transition-all duration-300'
            }
        >
            {props.content}
            <div onClick={handleClose}>Close</div>
        </div>
    );
}

interface MessageQueueComponentProps {
    messages: Message[];
    closeMessage(index: number): void;
}

function MessageQueueComponent(props: MessageQueueComponentProps) {
    return (
        <div className='fixed bottom-0 right-0 w-128'>
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
