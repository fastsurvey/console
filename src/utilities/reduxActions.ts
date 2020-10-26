import {
    LogOutAction,
    LogInAction,
    JWT,
    Account,
    OpenMessageAction,
    CloseMessageAction,
    CloseAllMessagesAction,
    OpenModalAction,
    CloseModalAction,
} from './types';

export const logInAction = (jwt: JWT, account: Account): LogInAction => ({
    type: 'LOG_IN',
    jwt,
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
