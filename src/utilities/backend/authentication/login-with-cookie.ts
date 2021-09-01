import Cookies from 'js-cookie';
import {types} from '@types';
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

// Libraries 'node-jsonwebtoken' and 'node-jose' do not work
// https://github.com/auth0/node-jsonwebtoken/issues/668
// I'll postpone this - but it would be way more elegant
// I mean that is the whole point of oauth2_token isn't it!?

export default loginWithCookie;
