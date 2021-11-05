import {types} from '/src/types';
import {httpGet} from '../http-clients';

async function fetchResults(
    account: types.Account,
    accessToken: types.AccessToken,
    centralConfigName: string,
    success: (results: any) => void,
    error: (code: any) => void,
) {
    try {
        const response = await httpGet(
            `/users/${account.username}/surveys/${centralConfigName}/results`,
            accessToken,
        ).catch((error: any) => {
            throw error.response.status;
        });

        success(response.data);
    } catch (code) {
        error(code);
    }
}

export default fetchResults;
