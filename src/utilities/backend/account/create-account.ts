import {httpPost, throwServerError} from '../http-clients';

async function createAccount(
    account: {
        email_address: string;
        username: string;
        password: string;
    },
    success: () => void,
    error: (reason: 'email' | 'username' | 'server') => void,
) {
    try {
        await httpPost('/users', account).catch((error) => {
            throw error.response;
        });

        success();
    } catch (response: any) {
        if (response.data.detail === 'username already taken') {
            error('username');
        } else if (response.data.detail === 'email already taken') {
            error('email');
        } else {
            error('server');
            throwServerError(account);
        }
    }
}

export default createAccount;
