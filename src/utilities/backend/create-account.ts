import {httpPost} from './http-clients';

export async function createAccount(
    account: {
        email_address: string;
        username: string;
        password: string;
    },
    success: () => void,
    error: (code: 400 | 500) => void,
) {
    try {
        await httpPost(`/users/${account.username}`, account).catch(
            (response: {statusCode: 400 | 401 | 422 | 500}) => {
                throw response.statusCode;
            },
        );

        success();
    } catch (code) {
        error(code);
    }
}
