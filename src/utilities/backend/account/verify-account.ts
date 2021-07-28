import {httpPost} from '../http-clients';

async function verifyAccount(
    verificationObject: {
        verification_token: string;
        password: string;
    },
    success: () => void,
    error: (code: 400 | 401 | 500) => void,
) {
    try {
        await httpPost(`/verification`, verificationObject).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code) {
        error(code);
    }
}

export default verifyAccount;
