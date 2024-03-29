import Cookies from 'js-cookie';
import {cloneDeep, pullAllBy} from 'lodash';
import {localIdUtils, constants} from '/src/utilities';
import {types} from '/src/types';
function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

export function updateState(
    state: types.ReduxState,
    action: types.ReduxAction,
): types.ReduxState {
    const newState = cloneDeep(state);
    console.debug(action.type, action);

    switch (action.type) {
        case 'LOG_IN':
            newState.loggingIn = false;
            newState.loggedIn = true;
            newState.accessToken = action.accessToken;
            newState.account = action.account;
            newState.configs = localIdUtils.initialize.surveys(action.configs);
            Cookies.set('accessToken', action.accessToken, {
                expires: 7,
            });
            Cookies.set('username', action.account.username, {
                expires: 7,
            });
            break;
        case 'UPDATE_USERNAME':
            newState.account.username = action.username;
            Cookies.set('username', action.username, {
                expires: 7,
            });
            break;

        case 'LOG_OUT':
            Cookies.remove('accessToken');
            Cookies.remove('username');
            return {...cloneDeep(constants.initialReduxState), loggingIn: false};

        case 'OPEN_MESSAGE':
            // do not have mutliple messages with the same text
            // increase the randomToken parameter when messages
            // are already there
            const existingMessages = newState.messages.filter(
                (m) => m.id === action.messageId,
            );
            if (existingMessages.length > 0) {
                newState.messages = [
                    ...pullAllBy(newState.messages, [{id: action.messageId}], 'id'),
                    {
                        ...existingMessages[0],
                        randomToken: existingMessages[0].randomToken + 1,
                    },
                ];
            } else {
                newState.messages = [
                    ...newState.messages,
                    constants.messages[action.messageId],
                ];
            }
            break;

        case 'CLOSE_MESSAGE':
            newState.messages = newState.messages.filter(
                (m) => m.id !== action.messageId,
            );
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
                ...newState.modalState,
                open: false,
            };
            break;

        case 'OPEN_NAVBAR':
            newState.navbarState = {open: true};
            break;

        case 'CLOSE_NAVBAR':
            newState.navbarState = {open: false};
            break;

        case 'ADD_CONFIG':
            assert(newState.configs !== undefined);
            newState.configs = [...newState.configs, action.config];
            break;

        case 'REMOVE_CONFIG':
            assert(newState.configs !== undefined);
            newState.configs = newState.configs.filter(
                (config) => config.survey_name !== action.surveyName,
            );
            newState.configIsDiffering = false;
            break;

        case 'SET_CENTRAL_CONFIG':
            assert(newState.configs !== undefined);
            newState.configs = newState.configs.map((c) =>
                c.local_id === action.config.local_id ? action.config : c,
            );
            newState.configIsDiffering = false;
            break;

        case 'MARK_DIFFERING':
            newState.configIsDiffering = action.differing;
            newState.messages = newState.messages.filter(
                (m) => m.id !== 'warning-editor-unsaved',
            );
            break;

        default:
            break;
    }

    return newState;
}
