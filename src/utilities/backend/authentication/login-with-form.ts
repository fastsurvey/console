import {types} from '@types';
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
    abort: (statusCode: 401 | 500) => void,
) {
    try {
        const {username, access_token: accessToken}: any = (
            await httpPost('/authentication', data).catch((error) => {
                console.log({data});
                console.log({error});
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
            ).data.email;
        } else {
            account.email = data.identifier;
        }

        const configs: types.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, accessToken)
        ).data;

        login(accessToken, account, configs);
    } catch (code) {
        console.log({code});
        abort(code === 401 ? 401 : 500);
    }
}

export default loginWithForm;
