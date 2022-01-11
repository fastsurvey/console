import {types} from '/src/types';
import {httpDelete, throwServerError} from '../http-clients';

async function removeAccount(
    account: types.Account,
    accessToken: types.AccessToken,
    success: () => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        await httpDelete(`/users/${account.username}`, accessToken).catch((error) => {
            throw error.response;
        });

        success();
    } catch (response: any) {
        if (response.status === 401) {
            error('authentication');
        } else {
            error('server');
            throwServerError({response, account});
        }
    }
}

export default removeAccount;
