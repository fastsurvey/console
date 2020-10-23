export interface ReduxState {
    loggingIn: boolean;
    loggedIn: boolean;
    jwt: undefined | JWT;
}

export type ReduxAction = LogInAction | LogOutAction;

export interface LogInAction {
    type: 'LOG_IN';
    jwt: JWT;
}

export interface LogOutAction {
    type: 'LOG_OUT';
}
export interface JWT {
    accessToken: string;
    refreshToken: string;
    bearer: string;
}
