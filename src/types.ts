export declare namespace types {
    export interface SurveyConfig {
        local_id: number;
        next_identifier: number;
        survey_name: string;
        start: number;
        end: number;
        draft: boolean;
        title: string;
        description: string;
        fields: SurveyField[];
    }

    export type SurveyField = EmailField | SelectionField | TextField;

    interface GeneralSurveyField {
        identifier: number;
        local_id: number;
        title: string;
        description: string;
    }

    export type FieldType = 'email' | 'text' | 'selection';

    export interface EmailField extends GeneralSurveyField {
        type: 'email';
        regex: string;
        verify: boolean;
        hint: string;
    }

    export interface TextField extends GeneralSurveyField {
        type: 'text';
        min_chars: number;
        max_chars: number;
    }

    export interface SelectionField extends GeneralSurveyField {
        type: 'selection';
        min_select: number;
        max_select: number;
        options: FieldOption[];
    }

    export interface FieldOption {
        title: string;
        local_id: number;
    }

    export interface EmailRegexSetup {
        label: string;
        value: number;
        regex: string;
        hint: string;
    }

    export interface SurveyResults {
        [key: string]: {
            count: number;
            value: null | number | {[key: string]: number};
        };
    }

    export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'gray';
    export type DownloadFormat = 'json' | 'csv';

    export interface ReduxState {
        loggingIn: boolean;
        loggedIn: boolean;
        accessToken: types.AccessToken;
        account: types.Account;
        messages: types.Message[];
        navbarState: NavbarState;
        modalState: ModalState;
        configs: types.SurveyConfig[];
        configIsDiffering: boolean;
    }

    export type AccessToken = string;

    export interface Account {
        email: string;
        username: string;
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
        | 'warning-account-not-verified'
        | 'error-submissions-exist'
        | 'error-server'
        | 'success-account-created'
        | 'error-email-taken'
        | 'error-email-invalid'
        | 'error-link-invalid'
        | 'success-redirect-to-login'
        | 'success-password-changed'
        | 'success-username-changed'
        | 'error-username-taken'
        | 'warning-clipboard'
        | 'warning-clipboard-support'
        | 'editor-warning-validators'
        | 'editor-warning-field-count'
        | 'editor-warning-authentication'
        | 'success-survey-duplicated'
        | 'success-survey-removed';

    export type ValidationResult =
        | {
              valid: true;
          }
        | {valid: false; message: string};

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
              accessToken: types.AccessToken;
              account: types.Account;
              configs: types.SurveyConfig[];
          }
        | {
              type: 'UPDATE_USERNAME';
              username: string;
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
