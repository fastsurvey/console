import {configTypes} from './config-types';

export declare namespace stateTypes {
    export interface ReduxState {
        loggingIn: boolean;
        loggedIn: boolean;
        oauth2_token: undefined | stateTypes.OAuth2Token;
        account: undefined | stateTypes.Account;
        messages: stateTypes.Message[];
        navbarState: NavbarState;
        modalState: ModalState;
        configs: undefined | configTypes.SurveyConfig[];
        configIsDiffering: boolean;
    }

    export interface OAuth2Token {
        access_token: string;
        refresh_token: string;
        bearer: string;
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
              oauth2_token: stateTypes.OAuth2Token;
              account: stateTypes.Account;
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
              type: 'ADD_CONFIGS';
              configs: configTypes.SurveyConfig[];
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
