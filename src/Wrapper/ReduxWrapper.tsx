import React, {useState, useEffect} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {
    ReduxAction,
    ReduxState,
    Account,
    OAuth2Token,
} from '../utilities/types';
import Cookies from 'js-cookie';
import {
    addConfigsAction,
    logInAction,
    logOutAction,
} from '../utilities/reduxActions';
import {generateValidOAuthToken} from '../utilities/jwtEncryption';
import {fetchSurveys} from '../utilities/surveyCommunication';
import {SurveyConfig} from '../utilities/types';

function storeReducer(
    state = {
        loggingIn: true,
        loggedIn: false,
        oauth2_token: undefined,
        account: undefined,
        messages: [],
        modalOpen: false,
        configs: undefined,
    },
    action: ReduxAction,
) {
    const newState: ReduxState = {
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn,
        oauth2_token: state.oauth2_token,
        account: state.account,
        messages: state.messages,
        modalOpen: state.modalOpen,
        configs: state.configs,
    };

    switch (action.type) {
        case 'LOG_IN':
            newState.loggingIn = false;
            newState.loggedIn = true;
            newState.oauth2_token = action.oauth2_token;
            newState.account = action.account;
            Cookies.set('oauth2_token', JSON.stringify(action.oauth2_token), {
                expires: 7,
            });
            break;
        case 'LOG_OUT':
            newState.loggingIn = false;
            newState.loggedIn = false;
            newState.oauth2_token = undefined;
            newState.account = undefined;
            Cookies.remove('oauth2_token');
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
        case 'OPEN_MODAL':
            newState.modalOpen = true;
            break;
        case 'CLOSE_MODAL':
            newState.modalOpen = false;
            break;
        case 'ADD_CONFIGS':
            newState.configs = action.configs;
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
    const [cookieLogin, setCookieLogin] = useState(false);

    async function logIn(oauth2_token: OAuth2Token, account: Account) {
        store.dispatch(logInAction(oauth2_token, account));
        await fetchSurveys(oauth2_token, (configs: SurveyConfig[]) => {
            store.dispatch(addConfigsAction(configs));
        });
    }

    useEffect(() => {
        async function loginFromCookie() {
            try {
                await generateValidOAuthToken(logIn);
            } catch {
                store.dispatch(logOutAction());
            }
        }

        if (!cookieLogin) {
            setCookieLogin(true);
            loginFromCookie();
        }
    }, [cookieLogin]);

    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxWrapper;
