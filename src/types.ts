export declare namespace types {
    export interface SurveyConfig {
        local_id: number;
        survey_name: string;
        start: number;
        end: number;
        draft: boolean;
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
        verify: boolean;
        hint: string;
    }

    export interface OptionField extends GeneralSurveyField {
        type: 'option';
        required: boolean;
    }

    export interface RadioField extends GeneralSurveyField {
        type: 'radio';
        options: FieldOption[];
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

    export interface SurveyResults {
        count: number;
        aggregation: {
            [key: string]: null | number | {[key: string]: number};
        };
    }

    export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'gray';

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
        | 'warning-clipboard'
        | 'editor-warning-validators'
        | 'editor-warning-field-count'
        | 'editor-warning-authentication';

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
