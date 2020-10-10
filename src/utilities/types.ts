export interface ReduxState {
    fetching: boolean;
    loggedIn: boolean;
    accessToken: string;
}

export type ReduxAction = LogInAction | LogOutAction;

export interface LogInAction {
    type: 'LOG_IN';
    accessToken: string;
}

export interface LogOutAction {
    type: 'LOG_OUT';
}
