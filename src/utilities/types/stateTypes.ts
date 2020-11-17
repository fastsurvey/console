import {SurveyConfig} from '../types';

namespace stateTypes {
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
        | {
              type: 'LOG_IN';
              oauth2_token: OAuth2Token;
              account: Account;
          }
        | {
              type: 'LOG_OUT';
          }
        | {
              type: 'OPEN_MESSAGE';
              message: Message;
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
              configs: SurveyConfig[];
          }
        | {
              type: 'MODIFY_CONFIG';
              config: SurveyConfig;
          }
        | {
              type: 'MARK_DIFFERING';
              differing: boolean;
          };
}

export default stateTypes;
