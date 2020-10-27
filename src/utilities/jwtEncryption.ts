import assert from 'assert';
import Cookies from 'js-cookie';
import {OAuth2Token, Account} from './types';
import {authPostRequest} from './axiosClients';

export async function generateValidOAuthToken(
    logIn: (oauth2_token: OAuth2Token, account: Account) => void,
) {
    const oauth2_token_cookie = Cookies.get('oauth2_token');
    assert(
        oauth2_token_cookie !== undefined,
        'OAuth2-Auto-Login: Cookie not found',
    );
    const current_oauth2_token = JSON.parse(oauth2_token_cookie);
    assert(
        current_oauth2_token.access_token !== undefined,
        'OAuth2-Auto-Login: access_token not found',
    );
    assert(
        current_oauth2_token.refresh_token !== undefined,
        'OAuth2-Auto-Login: refresh_token not found',
    );

    try {
        const accessResponse = await authPostRequest('/login/access', {
            access_token: current_oauth2_token.access_token,
        });
        const account = accessResponse?.data?.account;
        assert(account !== undefined);
        logIn(current_oauth2_token, account);
        return;
    } catch {}

    try {
        const refreshResponse = await authPostRequest('/login/refresh', {
            refresh_token: current_oauth2_token.refresh_token,
        });
        const new_oauth2_token = refreshResponse?.data?.oauth2_token;
        const account = refreshResponse?.data?.account;
        assert(new_oauth2_token !== undefined);
        assert(account !== undefined);
        logIn(new_oauth2_token, account);
        return;
    } catch {}

    throw Error;
}

// Libraries 'node-jsonwebtoken' and 'node-jose' do not work
// https://github.com/auth0/node-jsonwebtoken/issues/668
// I'll postpone this - but it would be way more elegant
// I mean that is the whole point of oauth2_token isn't it!?
