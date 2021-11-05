import {types} from '/src/types';
import {httpDelete} from '../http-clients';

async function removeAccount(
    account: types.Account,
    accessToken: types.AccessToken,
    success: () => void,
    error: () => void,
) {
    try {
        await httpDelete(`/users/${account.username}`, accessToken);

        success();
    } catch {
        error();
    }
}

export default removeAccount;
