import { ReduxAction } from './types';

export const logIn = (accessToken: string): ReduxAction => ({
    type: 'LOG_IN',
    accessToken,
});
