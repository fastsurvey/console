import {configTypes} from './config-types';

export declare namespace stateTypes {
    export interface ReduxState {
        loggingIn: boolean;
        loggedIn: boolean;
        oauth2_token: undefined | stateTypes.OAuth2Token;
        account: undefined | stateTypes.Account;
        messages: stateTypes.Message[];
        modalOpen: boolean;
        configs: undefined | configTypes.SurveyConfig[];
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
        | {
              type: 'LOG_IN';
              oauth2_token: stateTypes.OAuth2Token;
              account: stateTypes.Account;
          }
        | {
              type: 'LOG_OUT';
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
              type: 'CLOSE_ALL_MESSAGES';
          }
        | {
              type: 'OPEN_MODAL';
          }
        | {
              type: 'CLOSE_MODAL';
          }
        | {
              type: 'ADD_CONFIGS';
              configs: configTypes.SurveyConfig[];
          }
        | {
              type: 'MODIFY_CONFIG';
              config: configTypes.SurveyConfig;
          }
        | {
              type: 'MARK_DIFFERING';
              differing: boolean;
          };
}

export default stateTypes;
