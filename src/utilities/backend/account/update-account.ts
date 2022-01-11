import {types} from '/src/types';
import {httpPut, throwServerError} from '../http-clients';

async function updateAccount(
    account: types.Account,
    accessToken: types.AccessToken,
    accountUpdate: {
        password?: string;
        username?: string;
    },
    success: () => void,
    error: (reason: 'username-taken' | 'authentication' | 'server') => void,
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
        ).catch((error) => {
            throw error.response;
        });

        success();
    } catch (response: any) {
        if (response.status === 401) {
            error('authentication');
        } else if (accountUpdate.username !== undefined && response.status === 400) {
            error('username-taken');
        } else {
            error('server');
            throwServerError({response, account, newUsername: accountUpdate.username});
        }
    }
}

export default updateAccount;
