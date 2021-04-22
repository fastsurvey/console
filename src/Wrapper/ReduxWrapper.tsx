import React, {useState, useEffect} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Cookies from 'js-cookie';
import addLocalIds from '../utilities/form-helpers/add-local-ids';

import {stateTypes, configTypes, dispatchers, loginWithCookie} from 'utilities';

function storeReducer(
    state = {
        loggingIn: true,
        loggedIn: false,
        authToken: undefined,
        account: undefined,
        messages: [],
        configs: [],
        configIsDiffering: false,
        navbarState: {
            open: false,
        },
        modalState: {
            open: false,
            title: '',
            children: <div />,
        },
    },
    action: stateTypes.ReduxAction,
) {
    const newState: stateTypes.ReduxState = {
        loggingIn: state.loggingIn,
        loggedIn: state.loggedIn,
        authToken: state.authToken,
        account: state.account,
        messages: state.messages,
        navbarState: state.navbarState,
        modalState: state.modalState,
        configs: state.configs,
        configIsDiffering: state.configIsDiffering,
    };

    switch (action.type) {
        case 'LOG_IN':
            newState.loggingIn = false;
            newState.loggedIn = true;
            newState.authToken = action.authToken;
            newState.account = action.account;
            newState.configs = action.configs;
            Cookies.set('authToken', JSON.stringify(action.authToken), {
                expires: 7,
            });
            break;
        case 'LOG_OUT':
            newState.loggingIn = false;
            newState.loggedIn = false;
            newState.authToken = undefined;
            newState.account = undefined;
            Cookies.remove('authToken');
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
            newState.modalState = {
                open: true,
                title: action.title,
                children: action.children,
            };
            break;
        case 'CLOSE_MODAL':
            newState.modalState = {
                open: false,
                title: newState.modalState.title,
                children: newState.modalState.children,
            };
            break;
        case 'OPEN_NAVBAR':
            newState.navbarState = {open: true};
            break;
        case 'CLOSE_NAVBAR':
            newState.navbarState = {open: false};
            break;
        case 'ADD_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = [...newState.configs, action.config];
            }
            break;
        case 'DUPLICATE_CONFIG':
            if (newState.configs !== undefined) {
                const newConfig = addLocalIds.survey(
                    {...action.newConfig, survey_name: action.newSurveyName},
                    newState.configs.length,
                );
                newState.configs = [...newState.configs, newConfig];
            }
            break;
        case 'REMOVE_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = newState.configs.filter(
                    (config) => config.survey_name !== action.surveyName,
                );
            }
            break;
        case 'MODIFY_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = newState.configs.map(
                    (config: configTypes.SurveyConfig) =>
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

interface Props {
    children: React.ReactChild;
}
export function ReduxWrapper(props: Props) {
    const [cookieLogin, setCookieLogin] = useState(false);

    useEffect(() => {
        async function triggerLogin() {
            await loginWithCookie(
                dispatchers.logIn(store.dispatch),
                dispatchers.logOut(store.dispatch),
            );
        }

        if (!cookieLogin) {
            setCookieLogin(true);
            triggerLogin();
        }
    }, [cookieLogin]);

    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxWrapper;
