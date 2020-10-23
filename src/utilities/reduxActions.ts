import {
    LogOutAction,
    LogInAction,
    JWT,
    Account,
    OpenMessageAction,
    CloseMessageAction,
} from './types';

export const logInAction = (jwt: JWT, account: Account): LogInAction => ({
    type: 'LOG_IN',
    jwt,
    account,
});

export const logOutAction = (): LogOutAction => ({
    type: 'LOG_OUT',
});

export const openMessageAction = (
    content: string | React.ReactNode,
): OpenMessageAction => ({
    type: 'OPEN_MESSAGE',
    content,
});

export const closeMessageAction = (index: number): CloseMessageAction => ({
    type: 'CLOSE_MESSAGE',
    index,
});
