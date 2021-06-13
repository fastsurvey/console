import {httpPost} from './http-clients';

async function createAccount(
    account: {
        email_address: string;
        username: string;
        password: string;
    },
    success: () => void,
    error: (code: 400 | 500) => void,
) {
    try {
        await httpPost(`/users/${account.username}`, account).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default createAccount;
