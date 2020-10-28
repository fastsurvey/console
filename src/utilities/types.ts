export interface ReduxState {
    loggingIn: boolean;
    loggedIn: boolean;
    oauth2_token: undefined | OAuth2Token;
    account: undefined | Account;
    messages: Message[];
    modalOpen: boolean;
}

export interface OAuth2Token {
    accessToken: string;
    refreshToken: string;
    bearer: string;
}

export interface Account {
    email: string;
    email_verified: boolean;
}

export type Message = string;

export type ReduxAction =
    | LogInAction
    | LogOutAction
    | OpenMessageAction
    | CloseMessageAction
    | CloseAllMessagesAction
    | OpenModalAction
    | CloseModalAction;

export interface LogInAction {
    type: 'LOG_IN';
    oauth2_token: OAuth2Token;
    account: Account;
}

export interface LogOutAction {
    type: 'LOG_OUT';
}

export interface OpenMessageAction {
    type: 'OPEN_MESSAGE';
    text: string;
}

export interface CloseMessageAction {
    type: 'CLOSE_MESSAGE';
    text: string;
}

export interface CloseAllMessagesAction {
    type: 'CLOSE_ALL_MESSAGES';
}

export interface OpenModalAction {
    type: 'OPEN_MODAL';
}

export interface CloseModalAction {
    type: 'CLOSE_MODAL';
}

// --------------------------------------------------------

export interface SurveyConfig {
    admin_name: 'fastsurvey';
    description: '';
    end: 2000000000;
    mode: 0;
    start: 1000000000;
    survey_name: 'radio';
    title: 'Radio Test';
    fields: SurveyField[];
}

export type SurveyField =
    | EmailField
    | OptionField
    | RadioField
    | SelectionField
    | TextField;

export interface EmailField {
    type: 'Email';
    title: string;
    description: string;
    regex: string;
    hint: string;
}

export interface OptionField {
    type: 'Option';
    title: string;
    description: string;
    mandatory: boolean;
}

export interface RadioField {
    type: 'Radio';
    title: string;
    description: string;
    fields: RadioFieldOption[];
}

export interface RadioFieldOption {
    type: 'Option';
    title: string;
    description: string;
    mandatory: false;
}

export interface SelectionField {
    type: 'Selection';
    title: string;
    description: string;
    min_select: number;
    max_select: number;
    fields: SelectionFieldOption[];
}

export interface SelectionFieldOption {
    type: 'Option';
    title: string;
    description: string;
    mandatory: false;
}

export interface TextField {
    type: 'Text';
    title: string;
    description: string;
    min_chars: number;
    max_chars: number;
}
