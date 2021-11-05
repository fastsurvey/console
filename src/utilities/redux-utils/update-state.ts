import Cookies from 'js-cookie';
import {cloneDeep, unionBy} from 'lodash';
import {reduxUtils, localIdUtils} from '/src/utilities';
import {types} from '/src/types';
import constants from '../constants/index';
import logout from '../backend/authentication/logout';

function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

function updateState(state: types.ReduxState, action: types.ReduxAction) {
    const newState = cloneDeep(state);
    console.debug(action.type);

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
            logout(newState.accessToken);
            return {...cloneDeep(reduxUtils.initialState), loggingIn: false};

        case 'OPEN_MESSAGE':
            // do not have mutliple messages with the same text
            newState.messages = unionBy(
                [constants.messages[action.messageId]],
                newState.messages,
                'id',
            );
            break;

        case 'CLOSE_MESSAGE':
            newState.messages = newState.messages.filter(
                (m) => m.text !== action.text,
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
            const newSurvey = localIdUtils.initialize.survey(
                action.config,
                newState.configs.length,
            );

            newState.configs = [
                ...newState.configs,
                {...newSurvey, max_identifier: newSurvey.fields.length - 1},
            ];
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
                (m) => m.id !== 'warning-unsaved',
            );
            break;

        default:
            break;
    }

    return newState;
}

export default updateState;
