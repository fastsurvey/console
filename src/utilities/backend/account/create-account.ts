import {httpPost} from '../http-clients';

async function createAccount(
    account: {
        email_address: string;
        username: string;
        password: string;
    },
    success: () => void,
    error: (code: any) => void,
) {
    try {
        await httpPost('/users', account).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default createAccount;
