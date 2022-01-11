import {types} from '/src/types';
import {httpGet, httpPost, throwServerError} from '../http-clients';

async function loginWithForm(
    data: {
        identifier: string;
        password: string;
    },
    login: (
        authToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ) => void,
    error: (reason: 'credentials' | 'not-verified' | 'server') => void,
) {
    try {
        const {username, access_token: accessToken}: any = (
            await httpPost('/authentication', data).catch((error) => {
                throw error.response !== undefined ? error.response : error;
            })
        ).data;

        let account: {username: string; email: string} = {
            username,
            email: '',
        };

        if (!data.identifier.includes('@')) {
            account.email = (
                await httpGet(`/users/${data.identifier}`, accessToken)
            ).data.email_address;
        } else {
            account.email = data.identifier;
        }

        const configs: types.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, accessToken)
        ).data;

        login(accessToken, account, configs);
    } catch (response: any) {
        if (response.status === 401 || response.status === 404) {
            error('credentials');
        } else if (response.status === 403) {
            error('not-verified');
        } else {
            error('server');
            throwServerError({response, identifier: data.identifier});
        }
    }
}

export default loginWithForm;
