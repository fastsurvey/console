import {httpPost, throwServerError} from '../http-clients';

async function verifyAccount(
    verificationObject: {
        verification_token: string;
    },
    success: () => void,
    error: (reason: 'link-invalid' | 'server') => void,
) {
    try {
        await httpPost(`/verification`, JSON.stringify(verificationObject)).catch(
            (error) => {
                throw error;
            },
        );

        success();
    } catch (response: any) {
        if (response.status === 401) {
            error('link-invalid');
        } else {
            error('server');
            throwServerError({response, verificationObject});
        }
    }
}

export default verifyAccount;
