import {types} from '@types';
import {httpPut} from '../http-clients';

async function updateAccount(
    account: types.Account,
    accessToken: types.AccessToken,
    newPassword: string,
    success: () => void,
    error: (code: 400 | 401 | 422 | 500) => void,
) {
    try {
        await httpPut(
            `/users/${account.username}`,
            JSON.stringify({
                username: account.username,
                email_address: account.email,
                password: newPassword,
            }),
            accessToken,
        ).catch((response: {statusCode: 400 | 401 | 422 | 500}) => {
            throw response.statusCode;
        });

        success();
    } catch (code) {
        // @ts-ignore
        error(code);
    }
}

export default updateAccount;
