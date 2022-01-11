import {httpPost, throwServerError} from '../http-clients';

async function requestNewPassword(
    data: {
        identifier: string;
    },
    success: () => void,
    error: (reason: 'credentials' | 'not-verified' | 'server') => void,
) {
    try {
        await httpPost('/authentication', data).catch((error) => {
            throw error;
        });
        success();
    } catch (response: any) {
        if (response.status === 401 || response.status === 404) {
            error('credentials');
        } else if (response.status === 403) {
            error('not-verified');
        } else {
            error('server');
            throwServerError({response, identifier: data.identifier});
        }
    }
}

export default requestNewPassword;
