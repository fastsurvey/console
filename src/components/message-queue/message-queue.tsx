import React from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from 'utilities';
import VisualMessage from './visual-message';
import {types} from 'types';

interface Props {
    messages: types.Message[];
    closeMessage(text: string): void;
}
function MessageQueue(props: Props) {
    return (
        <div className='fixed bottom-0 z-30 mx-0 w-100vw md:mx-20vw md:w-60vw xl:w-30vw xl:mx-35vw'>
            {props.messages.map((message: types.Message) => (
                <VisualMessage
                    key={message.text}
                    message={message}
                    close={() => props.closeMessage(message.text)}
                />
            ))}
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    messages: state.messages,
});
const mapDispatchToProps = (dispatch: any) => ({
    closeMessage: reduxUtils.dispatchers.closeMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageQueue);
