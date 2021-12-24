export declare namespace types {
    export interface SurveyConfig {
        local_id: number;
        next_identifier: number;
        survey_name: string;
        start: number | null;
        end: number | null;
        title: string;
        fields: SurveyField[];
    }

    export type SurveyField =
        | EmailField
        | SelectionField
        | TextField
        | BreakField
        | MarkdownField;

    export type FieldType = 'email' | 'text' | 'selection' | 'break' | 'markdown';

    export interface EmailField {
        type: 'email';
        identifier: number;
        local_id: number;
        description: string;
        regex: string;
        verify: boolean;
        hint: string;
    }

    export interface TextField {
        type: 'text';
        identifier: number;
        local_id: number;
        description: string;
        min_chars: number;
        max_chars: number;
    }

    export interface SelectionField {
        type: 'selection';
        identifier: number;
        local_id: number;
        description: string;
        min_select: number;
        max_select: number;
        options: FieldOption[];
    }

    export interface FieldOption {
        title: string;
        local_id: number;
    }

    export interface BreakField {
        type: 'break';
        identifier: number;
        local_id: number;
    }

    export interface MarkdownField {
        type: 'markdown';
        identifier: number;
        local_id: number;
        description: string;
    }

    export interface EmailRegexSetup {
        label: string;
        value: number;
        regex: string;
        hint: string;
    }

    export type SurveyResults = {
        count: number;
        [key: string]:
            | number
            | {
                  count: number;
                  value?: null | {[key: string]: number};
                  verified?: number;
              };
    };

    export type SurveySubmission = {
        submission_time: number;
        submission: {
            [key: string]:
                | {
                      email_address: string;
                      verified: null | boolean;
                  }
                | string[]
                | string;
        };
    };

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
        randomToken: number;
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
        | 'editor-warning-authentication'
        | 'success-survey-duplicated'
        | 'success-submissions-removed'
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
              messageId: types.MessageId;
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
