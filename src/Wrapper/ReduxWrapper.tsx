import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReduxAction, ReduxState } from '../utilities/types';

function storeReducer(
    state = {
        fetching: false,
        loggedIn: false,
        accessToken: '',
    },
    action: ReduxAction
) {
    const newState: ReduxState = {
        fetching: state.fetching,
        loggedIn: state.loggedIn,
        accessToken: state.accessToken,
    };

    switch (action.type) {
        default:
            break;
    }

    return newState;
}

const store = createStore(storeReducer);

interface ReduxWrapperProps {
    children: React.ReactChild;
}
export function ReduxWrapper(props: ReduxWrapperProps) {
    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxWrapper;
