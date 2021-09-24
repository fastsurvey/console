import {httpPost} from '../http-clients';

async function verifyAccount(
    verificationObject: {
        verification_token: string;
    },
    success: () => void,
    error: (code: 400 | 401 | 500 | 422) => void,
) {
    try {
        await httpPost(
            `/verification`,
            JSON.stringify(verificationObject),
        ).catch((error) => {
            throw error.response.status;
        });

        success();
    } catch (code: any) {
        error(code);
    }
}

export default verifyAccount;
