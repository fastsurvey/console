import {LogOutAction, LogInAction} from './types';

export const logIn = (accessToken: string): LogInAction => ({
    type: 'LOG_IN',
    accessToken,
});

export const logOut = (): LogOutAction => ({
    type: 'LOG_OUT',
});
