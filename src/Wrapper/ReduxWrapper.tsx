import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ReduxAction, ReduxState} from '../utilities/types';

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
    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxWrapper;
