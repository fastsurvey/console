import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ReduxAction, ReduxState} from '../utilities/types';
import MessageQueueComponent from '../components/messageQueue';

function storeReducer(
    state = {
        loggingIn: false,
        loggedIn: false,
        jwt: undefined,
        account: undefined,
        messages: [],
    },
    action: ReduxAction,
) {
    const newState: ReduxState = {
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn,
        jwt: state.jwt,
        account: state.account,
        messages: state.messages,
    };

    switch (action.type) {
        case 'LOG_IN':
            newState.loggingIn = false;
            newState.loggedIn = true;
            newState.jwt = action.jwt;
            newState.account = action.account;
            break;
        case 'LOG_OUT':
            newState.loggingIn = false;
            newState.loggedIn = false;
            newState.jwt = undefined;
            newState.account = undefined;
            break;
        case 'OPEN_MESSAGE':
            if (!newState.messages.includes(action.text)) {
                newState.messages = [action.text].concat(newState.messages);
            }
            break;
        case 'CLOSE_MESSAGE':
            newState.messages = [...newState.messages].filter((text) => {
                return text != action.text;
            });
            break;
        case 'CLOSE_ALL_MESSAGES':
            newState.messages = [];
            break;
        default:
            break;
    }

    return newState;
}

// @ts-ignore
const store = createStore(storeReducer);

interface ReduxWrapperProps {
    children: React.ReactChild;
}
export function ReduxWrapper(props: ReduxWrapperProps) {
    return (
        <Provider store={store}>
            <MessageQueueComponent />
            {props.children}
        </Provider>
    );
}

export default ReduxWrapper;
