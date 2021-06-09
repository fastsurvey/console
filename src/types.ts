export declare namespace types {
    export interface SurveyConfig {
        local_id: number;
        survey_name: string;
        start: number;
        end: number;
        authentication: 'email' | 'open';
        draft: boolean;
        limit: number;
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

    export type FieldType = 'email' | 'option' | 'radio' | 'selection' | 'text';

    export interface EmailField extends GeneralSurveyField {
        type: 'email';
        regex: string;
        hint: string;
    }

    export interface OptionField extends GeneralSurveyField {
        type: 'option';
        required: boolean;
    }

    export interface RadioField extends GeneralSurveyField {
        type: 'radio';
        fields: FieldOption[];
    }

    export interface SelectionField extends GeneralSurveyField {
        type: 'selection';
        min_select: number;
        max_select: number;
        fields: FieldOption[];
    }

    export interface FieldOption extends GeneralSurveyField {
        type: 'option';
        required: boolean;
    }

    export interface TextField extends GeneralSurveyField {
        type: 'text';
        min_chars: number;
        max_chars: number;
    }

    export interface EmailRegexSetup {
        label: string;
        value: number;
        regex: string;
        hint: string;
    }

    export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'gray';

    export interface ReduxState {
        loggingIn: boolean;
        loggedIn: boolean;
        authToken: types.AuthToken;
        account: types.Account;
        messages: types.Message[];
        navbarState: NavbarState;
        modalState: ModalState;
        configs: types.SurveyConfig[];
        configIsDiffering: boolean;
    }

    export interface AuthToken {
        access_token: string;
        token_type: string;
    }

    export interface Account {
        email_address: string;
        username: string;
        verified: boolean;
    }

    // TODO: Add fix message versions (Message is union of those types)
    export type Message = {
        id: MessageId;
        text: string;
        type: 'warning' | 'error' | 'success';
    };

    export type MessageId =
        | 'warning-unsaved'
        | 'error-credentials'
        | 'error-server'
        | 'success-account-created'
        | 'error-email-taken'
        | 'error-email-invalid'
        | 'error-link-invalid'
        | 'success-redirect-to-login'
        | 'warning-clipboard'
        | 'editor-warning-validators'
        | 'editor-warning-field-count'
        | 'editor-warning-timing'
        | 'editor-warning-authentication'
        | 'editor-warning-option-list';

    export type NavbarState = {
        open: boolean;
    };

    export type ModalState = {
        open: boolean;
        title: string;
        children: React.ReactNode;
    };

    export type ReduxAction =
        | {
              type: 'LOG_IN';
              authToken: types.AuthToken;
              account: types.Account;
              configs: types.SurveyConfig[];
          }
        | {
              type: 'OPEN_MESSAGE';
              messageId: types.MessageId;
          }
        | {
              type: 'CLOSE_MESSAGE';
              text: string;
          }
        | {
              type: 'OPEN_MODAL';
              title: string;
              children: React.ReactNode;
          }
        | {
              type:
                  | 'LOG_OUT'
                  | 'CLOSE_ALL_MESSAGES'
                  | 'OPEN_NAVBAR'
                  | 'CLOSE_MODAL'
                  | 'CLOSE_NAVBAR';
          }
        | {
              type: 'SET_CENTRAL_CONFIG' | 'ADD_CONFIG';
              config: types.SurveyConfig;
          }
        | {
              type: 'MARK_DIFFERING';
              differing: boolean;
          }
        | {
              type: 'REMOVE_CONFIG';
              surveyName: string;
          }
        | {
              type: 'DUPLICATE_CONFIG';
              newSurveyName: string;
              newConfig: types.SurveyConfig;
          };
}
