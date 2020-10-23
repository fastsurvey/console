import {LogOutAction, LogInAction, JWT} from './types';

export const logIn = (jwt: JWT): LogInAction => ({
    type: 'LOG_IN',
    jwt,
});

export const logOut = (): LogOutAction => ({
    type: 'LOG_OUT',
});
