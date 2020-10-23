import {LogOutAction, LogInAction, JWT, Account} from './types';

export const logIn = (jwt: JWT, account: Account): LogInAction => ({
    type: 'LOG_IN',
    jwt,
    account,
});

export const logOut = (): LogOutAction => ({
    type: 'LOG_OUT',
});
