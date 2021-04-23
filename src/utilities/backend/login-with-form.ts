import {stateTypes, configTypes} from 'utilities';
import {httpGet, httpPost} from './http-clients';

async function loginWithForm(
    data: {
        identifier: string;
        password: string;
    },
    login: (
        authToken: stateTypes.AuthToken,
        account: stateTypes.Account,
        configs: configTypes.SurveyConfig[],
    ) => void,
    abort: (statusCode: 401 | 500) => void,
) {
    try {
        const formData = new FormData();
        formData.append('identifier', data.identifier);
        formData.append('password', data.password);

        const authToken: stateTypes.AuthToken = (
            await httpPost('/authentication', formData).catch(
                (response: {statusCode: number}) => {
                    throw response.statusCode;
                },
            )
        ).data;

        let username: string;
        if (data.identifier.includes('@')) {
            username = (await httpGet('/authentication', authToken)).data;
        } else {
            username = data.identifier;
        }

        const account: stateTypes.Account = (
            await httpGet(`/users/${username}`, authToken)
        ).data;
        const configs: configTypes.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, authToken)
        ).data;

        login(authToken, account, configs);
    } catch (code) {
        abort(code === 401 ? 401 : 500);
    }
}

export default loginWithForm;
