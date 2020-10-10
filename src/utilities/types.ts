export interface ReduxState {
    fetching: boolean;
    loggedIn: boolean;
    accessToken: string;
}

export type ReduxAction = LogInAction;

export interface LogInAction {
    type: 'LOG_IN';
    accessToken: string;
}
