import Cookies from 'js-cookie';
import {cloneDeep, unionBy} from 'lodash';
import {addLocalIds, reduxUtils} from 'utilities';
import {types} from 'types';
import assert from 'assert';

function updateState(state: types.ReduxState, action: types.ReduxAction) {
    const newState = cloneDeep(state);
    console.debug(action);

    switch (action.type) {
        case 'LOG_IN':
            newState.loggingIn = false;
            newState.loggedIn = true;
            newState.authToken = action.authToken;
            newState.account = action.account;
            newState.configs = addLocalIds.surveys(action.configs);
            Cookies.set('authToken', JSON.stringify(action.authToken), {
                expires: 7,
            });
            break;

        case 'LOG_OUT':
            Cookies.remove('authToken');
            return {...cloneDeep(reduxUtils.initialState), loggingIn: false};

        case 'OPEN_MESSAGE':
            // do not have mutliple messages with the same text
            newState.messages = unionBy(
                [action.message],
                newState.messages,
                'text',
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
            assert(newState.configs);
            newState.configs = [...newState.configs, action.config];
            break;

        case 'DUPLICATE_CONFIG':
            assert(newState.configs);
            newState.configs = [
                ...newState.configs,
                addLocalIds.survey(
                    {...action.newConfig, survey_name: action.newSurveyName},
                    newState.configs.length,
                ),
            ];
            break;

        case 'REMOVE_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = newState.configs.filter(
                    (config) => config.survey_name !== action.surveyName,
                );
            }
            break;

        case 'SET_CENTRAL_CONFIG':
            if (newState.configs !== undefined) {
                newState.configs = newState.configs.map(
                    (config: types.SurveyConfig) =>
                        config.local_id === action.config.local_id
                            ? action.config
                            : config,
                );
            }
            newState.configIsDiffering = false;
            break;

        case 'MARK_DIFFERING':
            newState.configIsDiffering = action.differing;
            newState.messages = newState.messages.filter(
                (m) => m.text !== 'Please save or undo your changes first!',
            );
            break;

        default:
            break;
    }

    return newState;
}

export default updateState;
