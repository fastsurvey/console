import {AddConfigsAction, SurveyConfig} from './types';
import {
    LogOutAction,
    LogInAction,
    OAuth2Token,
    Account,
    OpenMessageAction,
    CloseMessageAction,
    CloseAllMessagesAction,
    OpenModalAction,
    CloseModalAction,
} from './types';

export const logInAction = (
    oauth2_token: OAuth2Token,
    account: Account,
): LogInAction => ({
    type: 'LOG_IN',
    oauth2_token,
    account,
});

export const logOutAction = (): LogOutAction => ({
    type: 'LOG_OUT',
});

export const openMessageAction = (text: string): OpenMessageAction => ({
    type: 'OPEN_MESSAGE',
    text,
});

export const closeMessageAction = (text: string): CloseMessageAction => ({
    type: 'CLOSE_MESSAGE',
    text,
});

export const closeAllMessagesAction = (): CloseAllMessagesAction => ({
    type: 'CLOSE_ALL_MESSAGES',
});

export const openModalAction = (): OpenModalAction => ({
    type: 'OPEN_MODAL',
});

export const closeModalAction = (): CloseModalAction => ({
    type: 'CLOSE_MODAL',
});

export const addConfigsAction = (
    configs: SurveyConfig[],
): AddConfigsAction => ({
    type: 'ADD_CONFIGS',
    configs,
});
