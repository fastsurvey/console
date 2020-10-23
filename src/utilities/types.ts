export interface ReduxState {
    loggingIn: boolean;
    loggedIn: boolean;
    jwt: undefined | JWT;
    account: undefined | Account;
}

export type ReduxAction = LogInAction | LogOutAction;

export interface LogInAction {
    type: 'LOG_IN';
    jwt: JWT;
    account: Account;
}

export interface LogOutAction {
    type: 'LOG_OUT';
}
export interface JWT {
    accessToken: string;
    refreshToken: string;
    bearer: string;
}

export interface Account {
    email: string;
    email_verified: boolean;
}
