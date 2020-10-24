import jwt from 'jsonwebtoken';
import assert from 'assert';
import Cookies from 'js-cookie';
import {AUTH_BACKEND_URL} from '../constants';
import axios from 'axios';
import {JWT, Account} from './types';

export async function generateValidOAuthToken(
    logIn: (jwt: JWT, account: Account) => void,
) {
    const jwt_cookie = Cookies.get('jwt');
    assert(jwt_cookie !== undefined, 'JWT-Auto-Login: Cookie not found');
    const jwt_json = JSON.parse(jwt_cookie);
    assert(
        jwt_json.access_token !== undefined,
        'JWT-Auto-Login: access_token not found',
    );
    assert(
        jwt_json.refresh_token !== undefined,
        'JWT-Auto-Login: refresh_token not found',
    );

    // fetch publicKey
    const response = await axios.get(AUTH_BACKEND_URL);
    const publicKey = response?.data?.public_key;
    assert(publicKey !== undefined);
    console.log(publicKey);

    const accessPayload = decodeToken(jwt_json.access_token, publicKey);
    console.log(accessPayload);

    logIn(jwt_json, {email: 'dd', email_verified: false});
}

// frkn Auth0 is everywhere - library does not work
function decodeToken(token: string, publicKey: string) {
    return jwt.verify(token, publicKey, {algorithms: ['RS256']});
}
