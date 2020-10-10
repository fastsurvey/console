import React, {useState} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ReduxAction, ReduxState} from '../utilities/types';
import {logOut} from '../utilities/reduxActions';

function storeReducer(
    state = {
        fetching: true,
        loggedIn: false,
        accessToken: '',
    },
    action: ReduxAction,
) {
    const newState: ReduxState = {
        fetching: state.fetching,
        loggedIn: state.loggedIn,
        accessToken: state.accessToken,
    };

    switch (action.type) {
        case 'LOG_IN':
            newState.fetching = false;
            newState.loggedIn = true;
            newState.accessToken = action.accessToken;
            break;
        case 'LOG_OUT':
            newState.fetching = false;
            newState.loggedIn = false;
            newState.accessToken = '';
            break;
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
    const [fetching, setFetching] = useState(false);
    if (!fetching) {
        setFetching(true);
        setTimeout(() => {
            // store.dispatch(logIn('abcde'));
            store.dispatch(logOut());
        }, 1000);
    }

    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxWrapper;
