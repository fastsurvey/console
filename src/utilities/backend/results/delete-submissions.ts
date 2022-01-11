import {types} from '/src/types';
import {httpDelete, throwServerError} from '../http-clients';

async function deleteSubmissions(
    account: types.Account,
    accessToken: types.AccessToken,
    configName: string,
    success: () => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        await httpDelete(
            `/users/${account.username}/surveys/${configName}/submissions`,
            accessToken,
        ).catch((error: any) => {
            throw error.response.status;
        });

        success();
    } catch (response: any) {
        if (response.status === 401) {
            error('authentication');
        } else {
            error('server');
            throwServerError({response, account, configName});
        }
    }
}

export default deleteSubmissions;
