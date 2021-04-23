import assert from 'assert';
import Cookies from 'js-cookie';

import {stateTypes, configTypes} from 'utilities';
import {httpGet} from './http-clients';

async function loginWithCookie(
    login: (
        authToken: stateTypes.AuthToken,
        account: stateTypes.Account,
        configs: configTypes.SurveyConfig[],
    ) => void,
    abort: () => void,
) {
    try {
        const authTokenCookie = Cookies.get('authToken');
        assert(authTokenCookie !== undefined);
        const authToken = JSON.parse(authTokenCookie);
        assert(authToken.access_token !== undefined);
        assert(authToken.token_type !== undefined);

        const username: string = (await httpGet('/authentication', authToken))
            .data;
        const account: stateTypes.Account = (
            await httpGet(`/users/${username}`, authToken)
        ).data;
        const configs: configTypes.SurveyConfig[] = (
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
