import {types} from '/src/types';
import {httpGet, httpPost} from '../http-clients';

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
    abort: (statusCode: 401 | 403 | 404 | 500) => void,
) {
    try {
        const {username, access_token: accessToken}: any = (
            await httpPost('/authentication', data).catch((error) => {
                throw error.response.status;
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
    } catch (code: any) {
        abort([401, 403, 404, 500].includes(code) ? code : 500);
    }
}

export default loginWithForm;
