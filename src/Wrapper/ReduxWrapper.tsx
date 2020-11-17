import React, {useState, useEffect} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import stateTypes from '../utilities/types/stateTypes';
import Cookies from 'js-cookie';
import dispatcher from '../utilities/dispatcher';
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
        configIsDiffering: false,
    },
    action: stateTypes.ReduxAction,
) {
    const newState: stateTypes.ReduxState = {
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn,
        oauth2_token: state.oauth2_token,
        account: state.account,
        messages: state.messages,
        modalOpen: state.modalOpen,
        configs: state.configs,
        configIsDiffering: state.configIsDiffering,
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
            if (
                newState.messages.filter(
                    (message) => message.text === action.message.text,
                ).length === 0
            ) {
                newState.messages = [...[action.message], ...newState.messages];
            }
            break;
        case 'CLOSE_MESSAGE':
            newState.messages = newState.messages.filter((message) => {
                return message.text !== action.text;
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
        case 'MODIFY_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = newState.configs.map(
                    (config: SurveyConfig) =>
                        config.local_id === action.config.local_id
                            ? action.config
                            : config,
                );
            }
            newState.configIsDiffering = false;
            break;
        case 'MARK_DIFFERING':
            newState.configIsDiffering = action.differing;
            newState.messages = newState.messages.filter((message) => {
                return (
                    message.text !== 'Please save or undo your changes first!'
                );
            });
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

    async function logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ) {
        dispatcher.logIn(store.dispatch)(oauth2_token, account);
        await fetchSurveys(oauth2_token, (configs: SurveyConfig[]) => {
            dispatcher.addConfigs(store.dispatch)(configs);
        });
    }

    useEffect(() => {
        async function loginFromCookie() {
            try {
                await generateValidOAuthToken(logIn);
            } catch {
                dispatcher.logOut(store.dispatch)();
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
