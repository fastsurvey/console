import {types} from '@types';
import {httpPut} from '../http-clients';

async function updateAccount(
    account: types.Account,
    accessToken: types.AccessToken,
    accountUpdate: {
        password?: string;
        username?: string;
    },
    success: () => void,
    error: (code: 400 | 401 | 422 | 500) => void,
) {
    try {
        await httpPut(
            `/users/${account.username}`,
            JSON.stringify({
                username: account.username,
                email_address: account.email,
                ...accountUpdate,
            }),
            accessToken,
        ).catch((response: {response: {status: 400 | 401 | 422 | 500}}) => {
            throw response.response.status;
        });

        success();
    } catch (code) {
        // @ts-ignore
        error(code);
    }
}

export default updateAccount;
