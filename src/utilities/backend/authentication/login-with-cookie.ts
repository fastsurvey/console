import Cookies from 'js-cookie';
import {types} from '/src/types';
import {httpGet} from '../http-clients';

function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

async function loginWithCookie(
    login: (
        accessToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ) => void,
    abort: () => void,
) {
    try {
        const accessToken: any = Cookies.get('accessToken');
        const username: any = Cookies.get('username');
        assert(accessToken !== undefined);
        assert(username !== undefined);

        const email: string = (await httpGet(`/users/${username}`, accessToken))
            .data.email_address;
        const account = {
            username,
            email,
        };

        const configs: types.SurveyConfig[] = (
            await httpGet(`/users/${username}/surveys`, accessToken)
        ).data;

        login(accessToken, account, configs);
    } catch {
        abort();
    }
}

export default loginWithCookie;
