import Cookies from 'js-cookie';
import {types} from '@types';
import {httpGet} from './http-clients';

function assert(condition: boolean) {
    if (!condition) {
        throw Error;
    }
}

async function loginWithCookie(
    login: (
        authToken: types.AuthToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ) => void,
    abort: () => void,
) {
    try {
        const authTokenCookie = Cookies.get('authToken');
        assert(authTokenCookie !== undefined);

        //@ts-ignore
        const authToken = JSON.parse(authTokenCookie);
        assert(authToken.access_token !== undefined);
        assert(authToken.token_type !== undefined);

        const username: string = (await httpGet('/authentication', authToken))
            .data;
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
    } catch {
        abort();
    }
}

// Libraries 'node-jsonwebtoken' and 'node-jose' do not work
// https://github.com/auth0/node-jsonwebtoken/issues/668
// I'll postpone this - but it would be way more elegant
// I mean that is the whole point of oauth2_token isn't it!?

export default loginWithCookie;
