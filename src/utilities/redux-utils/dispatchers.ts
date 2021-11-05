import {types} from '/src/types';

const dispatchers = {
    logIn:
        (dispatch: any) =>
        (
            accessToken: types.AccessToken,
            account: types.Account,
            configs: types.SurveyConfig[],
        ): void =>
            dispatch({
                type: 'LOG_IN',
                accessToken,
                account,
                configs,
            }),
    updateUsername:
        (dispatch: any) =>
        (username: string): void =>
            dispatch({
                type: 'UPDATE_USERNAME',
                username,
            }),
    logOut: (dispatch: any) => (): void =>
        dispatch({
            type: 'LOG_OUT',
        }),
    openModal:
        (dispatch: any) =>
        (title: string, children: React.ReactNode): void =>
            dispatch({
                type: 'OPEN_MODAL',
                title,
                children,
            }),
    closeModal: (dispatch: any) => (): void =>
        dispatch({
            type: 'CLOSE_MODAL',
        }),
    openNavbar: (dispatch: any) => (): void =>
        dispatch({
            type: 'OPEN_NAVBAR',
        }),
    closeNavbar: (dispatch: any) => (): void =>
        dispatch({
            type: 'CLOSE_NAVBAR',
        }),
    openMessage:
        (dispatch: any) =>
        (messageId: types.MessageId): void =>
            dispatch({
                type: 'OPEN_MESSAGE',
                messageId,
            }),
    closeMessage:
        (dispatch: any) =>
        (text: string): void =>
            dispatch({
                type: 'CLOSE_MESSAGE',
                text,
            }),
    closeAllMessages: (dispatch: any) => (): void =>
        dispatch({
            type: 'CLOSE_ALL_MESSAGES',
        }),
    addConfigs:
        (dispatch: any) =>
        (configs: types.SurveyConfig[]): void =>
            dispatch({
                type: 'ADD_CONFIGS',
                configs,
            }),
    addConfig:
        (dispatch: any) =>
        (config: types.SurveyConfig): void =>
            dispatch({
                type: 'ADD_CONFIG',
                config,
            }),
    setCentralConfig:
        (dispatch: any) =>
        (config: types.SurveyConfig): void =>
            dispatch({
                type: 'SET_CENTRAL_CONFIG',
                config,
            }),
    markDiffering:
        (dispatch: any) =>
        (differing: boolean): void =>
            dispatch({
                type: 'MARK_DIFFERING',
                differing,
            }),
    removeConfig:
        (dispatch: any) =>
        (surveyName: string): void =>
            dispatch({
                type: 'REMOVE_CONFIG',
                surveyName,
            }),
};

export default dispatchers;
