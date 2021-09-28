import {types} from '@types';
import {httpGet} from '../http-clients';

async function fetchSubmissions(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    success: (results: any) => void,
    error: (code: any) => void,
) {
    try {
        const response = await httpGet(
            `/users/${account.username}/surveys/${centralConfigName}/submissions`,
            accessToken,
        ).catch((error: any) => {
            throw error.response.status;
        });

        success(response.data);
    } catch (code) {
        error(code);
    }
}

export default fetchSubmissions;
