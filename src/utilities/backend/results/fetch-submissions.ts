import {types} from '/src/types';
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
            throw error.response;
        });

        success(response.data);
    } catch (response: any) {
        error(response?.status ? response.status : 500);
    }
}

export default fetchSubmissions;
