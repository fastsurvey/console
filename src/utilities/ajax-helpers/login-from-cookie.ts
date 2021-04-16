import assert from 'assert';
import Cookies from 'js-cookie';

import {stateTypes, authGetRequest} from 'utilities';

async function loginFromCookie(
    logIn: (
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ) => void,
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
        // TODO: Use actual username
        const accessResponse = await authGetRequest(
            '/users/123',
            current_oauth2_token,
        );
        const account = accessResponse?.data;
        assert(account.email_address !== undefined);
        logIn(current_oauth2_token, account);
        return;
    } catch {}

    // TODO: Fetch with refresh token

    throw Error;
}

// Libraries 'node-jsonwebtoken' and 'node-jose' do not work
// https://github.com/auth0/node-jsonwebtoken/issues/668
// I'll postpone this - but it would be way more elegant
// I mean that is the whole point of oauth2_token isn't it!?

export default loginFromCookie;
