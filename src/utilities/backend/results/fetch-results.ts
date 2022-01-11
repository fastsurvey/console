import {types} from '/src/types';
import {httpGet, throwServerError} from '../http-clients';

async function fetchResults(
    account: types.Account,
    accessToken: types.AccessToken,
    configName: string,
    success: (results: any) => void,
    error: (reason: 'authentication' | 'server') => void,
) {
    try {
        const response = await httpGet(
            `/users/${account.username}/surveys/${configName}/results`,
            accessToken,
        ).catch((error: any) => {
            throw error.response !== undefined ? error.response : error;
        });

        success(response.data);
    } catch (response: any) {
        if (response.status === 401) {
            error('authentication');
        } else {
            error('server');
            throwServerError({response, account, configName});
        }
    }
}

export default fetchResults;
