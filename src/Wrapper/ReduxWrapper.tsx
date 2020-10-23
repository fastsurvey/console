import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {ReduxAction, ReduxState} from '../utilities/types';
import MessageQueueComponent from '../components/messageQueue';
import Cookies from 'js-cookie';
import {logInAction, logOutAction} from '../utilities/reduxActions';
import {AUTH_BACKEND_URL} from '../constants';
import axios from 'axios';

function storeReducer(
    state = {
        loggingIn: Cookies.get('jwt') !== undefined,
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
            Cookies.set('jwt', JSON.stringify(action.jwt), {expires: 7});
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
                return text !== action.text;
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
    const jwt_cookie = Cookies.get('jwt');
    if (jwt_cookie !== undefined) {
        const jwt = JSON.parse(jwt_cookie);
        if (jwt.access_token === undefined || jwt.refresh_token === undefined) {
            store.dispatch(logOutAction());
        } else {
            // 1. Try to validate access_token
            let formData1 = new FormData();
            formData1.append('access_token', jwt.access_token);
            axios
                .post(AUTH_BACKEND_URL + '/login/access', formData1)
                .then((response) => {
                    store.dispatch(logInAction(jwt, response.data.account));
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        // 2. Try to validate refresh_token
                        let formData2 = new FormData();
                        formData2.append('refresh_token', jwt.refresh_token);
                        axios
                            .post(
                                AUTH_BACKEND_URL + '/login/refresh',
                                formData2,
                            )
                            .then((response) => {
                                store.dispatch(
                                    logInAction(
                                        response.data.jwt,
                                        response.data.account,
                                    ),
                                );
                            })
                            .catch(() => {
                                store.dispatch(logOutAction());
                            });
                    } else {
                        store.dispatch(logOutAction());
                    }
                });
        }
    }

    return (
        <Provider store={store}>
            <MessageQueueComponent />
            {props.children}
        </Provider>
    );
}

export default ReduxWrapper;
