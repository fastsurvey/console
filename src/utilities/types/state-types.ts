import {configTypes} from './config-types';

export declare namespace stateTypes {
    export interface ReduxState {
        loggingIn: boolean;
        loggedIn: boolean;
        authToken: undefined | stateTypes.AuthToken;
        account: undefined | stateTypes.Account;
        messages: stateTypes.Message[];
        navbarState: NavbarState;
        modalState: ModalState;
        configs: undefined | configTypes.SurveyConfig[];
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

    export type Message = {
        text: string;
        type: 'info' | 'warning' | 'error' | 'success';
    };

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
              authToken: stateTypes.AuthToken;
              account: stateTypes.Account;
              configs: configTypes.SurveyConfig[];
          }
        | {
              type: 'OPEN_MESSAGE';
              message: stateTypes.Message;
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
              type: 'MODIFY_CONFIG' | 'ADD_CONFIG';
              config: configTypes.SurveyConfig;
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
              newConfig: configTypes.SurveyConfig;
          };
}

export default stateTypes;
