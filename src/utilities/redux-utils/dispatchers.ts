import {stateTypes, configTypes} from 'utilities';

const dispatchers = {
    logIn: (dispatch: any) => (
        authToken: stateTypes.AuthToken,
        account: stateTypes.Account,
        configs: configTypes.SurveyConfig[],
    ): void =>
        dispatch({
            type: 'LOG_IN',
            authToken,
            account,
            configs,
        }),
    logOut: (dispatch: any) => (): void =>
        dispatch({
            type: 'LOG_OUT',
        }),
    openModal: (dispatch: any) => (
        title: string,
        children: React.ReactNode,
    ): void =>
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
    openMessage: (dispatch: any) => (message: stateTypes.Message): void =>
        dispatch({
            type: 'OPEN_MESSAGE',
            message,
        }),
    closeMessage: (dispatch: any) => (text: string): void =>
        dispatch({
            type: 'CLOSE_MESSAGE',
            text,
        }),
    closeAllMessages: (dispatch: any) => (): void =>
        dispatch({
            type: 'CLOSE_ALL_MESSAGES',
        }),
    addConfigs: (dispatch: any) => (
        configs: configTypes.SurveyConfig[],
    ): void =>
        dispatch({
            type: 'ADD_CONFIGS',
            configs,
        }),
    addConfig: (dispatch: any) => (config: configTypes.SurveyConfig): void =>
        dispatch({
            type: 'ADD_CONFIG',
            config,
        }),
    modifyConfig: (dispatch: any) => (config: configTypes.SurveyConfig): void =>
        dispatch({
            type: 'MODIFY_CONFIG',
            config,
        }),
    markDiffering: (dispatch: any) => (differing: boolean): void =>
        dispatch({
            type: 'MARK_DIFFERING',
            differing,
        }),
    removeConfig: (dispatch: any) => (surveyName: string): void =>
        dispatch({
            type: 'REMOVE_CONFIG',
            surveyName,
        }),
    duplicateConfig: (dispatch: any) => (
        newSurveyName: string,
        newConfig: configTypes.SurveyConfig,
    ): void =>
        dispatch({
            type: 'DUPLICATE_CONFIG',
            newSurveyName,
            newConfig,
        }),
};

export default dispatchers;
