import {types} from 'types';
import {httpGet, httpPost} from './http-clients';

async function loginWithForm(
    data: {
        identifier: string;
        password: string;
    },
    login: (
        authToken: types.AuthToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ) => void,
    abort: (statusCode: 401 | 500) => void,
) {
    try {
        const authToken: types.AuthToken = (
            await httpPost('/authentication', data).catch(
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

        const email_address: string = (
            await httpGet(`/users/${username}`, authToken)
        ).data.email_address;
        const account = {
            username,
            email_address,
            verified: true,
        };

        const configs: types.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, authToken)
        ).data;

        login(authToken, account, configs);
    } catch (code) {
        abort(code === 401 ? 401 : 500);
    }
}

export default loginWithForm;
