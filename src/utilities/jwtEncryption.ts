import jwt from 'jsonwebtoken';
import assert from 'assert';
import Cookies from 'js-cookie';
import {JWT, Account} from './types';
import {authPostRequest} from './axiosClients';

export async function generateValidOAuthToken(
    logIn: (jwt: JWT, account: Account) => void,
) {
    const jwt_cookie = Cookies.get('jwt');
    assert(jwt_cookie !== undefined, 'JWT-Auto-Login: Cookie not found');
    const current_jwt = JSON.parse(jwt_cookie);
    assert(
        current_jwt.access_token !== undefined,
        'JWT-Auto-Login: access_token not found',
    );
    assert(
        current_jwt.refresh_token !== undefined,
        'JWT-Auto-Login: refresh_token not found',
    );

    try {
        const accessResponse = await authPostRequest('/login/access', {
            access_token: current_jwt.access_token,
        });
        const account = accessResponse?.data?.account;
        assert(account !== undefined);
        logIn(current_jwt, account);
        return;
    } catch {}

    try {
        const refreshResponse = await authPostRequest('/login/refresh', {
            refresh_token: current_jwt.refresh_token,
        });
        const new_jwt = refreshResponse?.data?.jwt;
        const account = refreshResponse?.data?.account;
        assert(jwt !== undefined);
        assert(account !== undefined);
        logIn(new_jwt, account);
        return;
    } catch {}

    throw Error;
}

// Libraries 'node-jsonwebtoken' and 'node-jose' do not work
// https://github.com/auth0/node-jsonwebtoken/issues/668
// I'll postpone this - but it would be way more elegant
// I mean that is the whole point of jwt isn't it!?

// eslint-disable-next-line
function decodeToken(token: string, publicKey: string) {
    return jwt.verify(token, publicKey, {algorithms: ['RS256']});
}
