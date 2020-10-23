export interface ReduxState {
    loggingIn: boolean;
    loggedIn: boolean;
    jwt: undefined | JWT;
    account: undefined | Account;
    messages: Message[];
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

export interface Message {
    content: string | React.ReactNode;
}

export type ReduxAction =
    | LogInAction
    | LogOutAction
    | OpenMessageAction
    | CloseMessageAction;

export interface LogInAction {
    type: 'LOG_IN';
    jwt: JWT;
    account: Account;
}

export interface LogOutAction {
    type: 'LOG_OUT';
}

export interface OpenMessageAction {
    type: 'OPEN_MESSAGE';
    content: string | React.ReactNode;
}

export interface CloseMessageAction {
    type: 'CLOSE_MESSAGE';
    index: number;
}
