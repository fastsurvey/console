import {httpPost} from '../http-clients';

async function createAccount(
    account: {
        email_address: string;
        username: string;
        password: string;
    },
    success: () => void,
    error: (reason: 'email' | 'username' | 'format' | 'server') => void,
) {
    try {
        await httpPost('/users', account).catch((error) => {
            throw error.response;
        });

        success();
    } catch (response: any) {
        if (response.status === 500) {
            error('server');
        } else if (response.status === 422) {
            error('format');
        } else if (response.data.detail === 'username already taken') {
            error('username');
        } else {
            error('email');
        }
    }
}

export default createAccount;
