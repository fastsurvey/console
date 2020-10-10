export interface ReduxState {
    fetching: boolean;
    loggedIn: boolean;
    accessToken: string;
}

export interface ReduxAction {
    type: string;
}
