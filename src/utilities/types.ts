export interface ReduxState {
    loggingIn: boolean;
    loggedIn: boolean;
    oauth2_token: undefined | OAuth2Token;
    account: undefined | Account;
    messages: Message[];
    modalOpen: boolean;
    configs: undefined | SurveyConfig[];
    configIsDiffering: boolean;
}

export interface OAuth2Token {
    access_token: string;
    refresh_token: string;
    bearer: string;
}

export interface Account {
    email: string;
    email_verified: boolean;
}

export type Message = {
    text: string;
    type: 'info' | 'warning' | 'error' | 'success';
};

export type ReduxAction =
    | LogInAction
    | LogOutAction
    | OpenMessageAction
    | CloseMessageAction
    | CloseAllMessagesAction
    | OpenModalAction
    | CloseModalAction
    | AddConfigsAction
    | ModifyConfigAction
    | MarkDifferingAction;

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
    message: Message;
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

export interface AddConfigsAction {
    type: 'ADD_CONFIGS';
    configs: SurveyConfig[];
}

export interface ModifyConfigAction {
    type: 'MODIFY_CONFIG';
    config: SurveyConfig;
}

export interface MarkDifferingAction {
    type: 'MARK_DIFFERING';
    differing: boolean;
}

// --------------------------------------------------------

export interface SurveyConfig {
    local_id: number;
    admin_name: string;
    survey_name: string;
    start: number;
    end: number;
    mode: 0 | 1 | 2;
    draft: boolean;
    submission_limit: number;
    title: string;
    description: string;
    fields: SurveyField[];
}

export type SurveyField =
    | EmailField
    | OptionField
    | RadioField
    | SelectionField
    | TextField;

interface GeneralSurveyField {
    local_id: number;
    title: string;
    description: string;
}
interface SurveyFieldOption {
    type: 'Option';
    title: string;
    description: string;
}

export interface EmailField extends GeneralSurveyField {
    type: 'Email';
    regex: string;
    hint: string;
}

export interface OptionField extends GeneralSurveyField {
    type: 'Option';
    title: string;
    description: string;
    mandatory: boolean;
}

export interface RadioField extends GeneralSurveyField {
    type: 'Radio';
    title: string;
    description: string;
    fields: RadioFieldOption[];
}

export interface RadioFieldOption extends SurveyFieldOption {
    mandatory: false;
}

export interface SelectionField extends GeneralSurveyField {
    type: 'Selection';
    min_select: number;
    max_select: number;
    fields: SelectionFieldOption[];
}

export interface SelectionFieldOption extends SurveyFieldOption {
    mandatory: false;
}

export interface TextField extends GeneralSurveyField {
    type: 'Text';
    min_chars: number;
    max_chars: number;
}
